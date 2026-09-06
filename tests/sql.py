import sqlite3,re
from pathlib import Path
c=sqlite3.connect(':memory:')
for p in sorted(Path('drizzle').glob('*.sql')): c.executescript(p.read_text())
c.execute('INSERT INTO room(id,settings) VALUES(1,?)',('{}',))
queries=[]
for p in ['app/api/control/route.ts','lib/server.ts']:
 queries += [x[1] for x in re.findall(r'prepare\(([\'\"])(.*?)\1\)',Path(p).read_text(),re.S)]
def q(prefix): return next(x for x in queries if x.startswith(prefix))
start=q('UPDATE room SET session=?')
assert c.execute(start,('first',25000,1000,1000)).fetchone()==(1,)
assert c.execute(start,('second',25000,1000,1000)).fetchone() is None
lock=q('UPDATE room SET job=?,job_until=?,last_request=')
assert c.execute(lock,('job-a',19000,1100,'first',0,1100,900)).fetchone()==(1,)
assert c.execute(lock,('job-b',19000,1100,'first',0,1100,900)).fetchone() is None
publish=q('UPDATE room SET seq=?,caption=')
args=(1,'English','Russian','[]',1200,15000,.001,0,100,10,'first',0,'job-a',1200)
assert c.execute(publish,args).fetchone() is not None
assert c.execute(publish,args).fetchone() is None
assert c.execute(lock,('job-c',21000,2000,'first',1,2000,1800)).fetchone()==(1,)
stop=q('UPDATE room SET session=NULL')
c.execute(stop,(2200,'first'))
late=(2,'Late English','Russian','[]',2300,15000,.001,0,100,10,'first',1,'job-c',2300)
assert c.execute(publish,late).fetchone() is None
assert c.execute('SELECT caption,source,context,session FROM room').fetchone()==('','','[]',None)
print('8 SQLite checks passed: single session, single request, duplicate publication, stop fencing and transcript cleanup.')
