import {scheduleCaption} from '@/lib/core';
import {body,cookie,cookieHeader,errorResponse,freshRoom,json,settings,validViewer} from '@/lib/server';
import {AppError} from '@/lib/providers';
import {publicSettings} from '@/lib/settings';
export async function POST(req:Request){try{const b=await body(req);const r=await freshRoom();if(typeof b.token!=='string'||!await validViewer(b.token,r))throw new AppError('Доступ к экрану отозван.',403);return json({ok:true},200,{'Set-Cookie':cookieHeader(req,'church_viewer',b.token,60*60*24*90)});}catch(e){return errorResponse(e);}}
export async function GET(req:Request){try{const r=await freshRoom();if(!await validViewer(cookie(req,'church_viewer'),r))throw new AppError('Доступ к экрану отозван.',403);const now=Date.now();const pages=scheduleCaption(r.caption,settings(r)).pages;const page=Math.min(pages.length-1,Math.floor((now-r.published)/3000));return json({revision:r.revision+':'+page,text:r.session&&!r.hidden&&r.expires>now?(pages[page]||''):'',ttl:Math.max(0,r.expires-now),settings:publicSettings(settings(r)),serverNow:now});}catch(e){return errorResponse(e);}}
