import {sqliteTable,text,integer,real} from 'drizzle-orm/sqlite-core';
export const room=sqliteTable('room',{
 id:integer('id').primaryKey(),settings:text('settings').notNull(),viewerEpoch:integer('viewer_epoch').notNull().default(1),
 session:text('session'),lease:integer('lease').notNull().default(0),started:integer('started').notNull().default(0),ended:integer('ended').notNull().default(0),callId:text('call_id'),connectLock:text('connect_lock'),
 seq:integer('seq').notNull().default(0),job:text('job'),jobUntil:integer('job_until').notNull().default(0),revision:integer('revision').notNull().default(0),
 caption:text('caption').notNull().default(''),source:text('source').notNull().default(''),context:text('context').notNull().default('[]'),published:integer('published').notNull().default(0),expires:integer('expires').notNull().default(0),hidden:integer('hidden').notNull().default(0),
 translationCost:real('translation_cost').notNull().default(0),unknownCost:integer('unknown_cost').notNull().default(0),inputTokens:integer('input_tokens').notNull().default(0),outputTokens:integer('output_tokens').notNull().default(0),
 lastRequest:integer('last_request').notNull().default(0),
});
export const rateLimits=sqliteTable('rate_limits',{key:text('key').primaryKey(),window:integer('window').notNull(),count:integer('count').notNull()});
