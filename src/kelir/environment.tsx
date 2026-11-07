import React from 'react';
import {PALETTE} from './appearance';
import {Shot} from './schema';
export const WorldDefs:React.FC=()=> <defs>
 <radialGradient id="lampLight"><stop stopColor="#FFF0BD" stopOpacity=".92"/><stop offset=".19" stopColor="#F6BA67" stopOpacity=".62"/><stop offset=".7" stopColor="#B56C2C" stopOpacity=".13"/><stop offset="1" stopColor="#B56C2C" stopOpacity="0"/></radialGradient>
 <radialGradient id="frameDark"><stop offset=".36" stopColor="#000" stopOpacity="0"/><stop offset="1" stopColor="#070709" stopOpacity=".88"/></radialGradient>
 <linearGradient id="night" x2="0" y2="1"><stop stopColor="#172332"/><stop offset="1" stopColor="#354151"/></linearGradient>
 <linearGradient id="wall" x2="0" y2="1"><stop stopColor="#4A301C"/><stop offset=".6" stopColor="#805125"/><stop offset="1" stopColor="#342115"/></linearGradient>
 <linearGradient id="wood" x2="1" y2="1"><stop stopColor="#A06B34"/><stop offset="1" stopColor="#291B12"/></linearGradient>
 <filter id="softBlur" x="-35%" y="-35%" width="170%" height="170%"><feGaussianBlur stdDeviation="20"/></filter>
 <filter id="shadowBlur" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="8"/></filter>
 <filter id="flameBlur" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="12"/></filter>
 <pattern id="mat" width="28" height="26" patternUnits="userSpaceOnUse"><path d="M0 0L28 26M28 0L0 26" stroke="#CF8C4B" strokeWidth="2" opacity=".17"/><path d="M0 13H28M14 0V26" stroke="#221509" strokeWidth="1.6" opacity=".25"/></pattern>
 <pattern id="planks" width="1080" height="82" patternUnits="userSpaceOnUse"><path d="M0 0H1080M0 80H1080M194 0V80M620 0V80M850 0V80" fill="none" stroke="#180F0B" strokeWidth="6"/><path d="M0 27 Q300 16 540 29 T1080 23" fill="none" stroke="#E7AA53" strokeOpacity=".09" strokeWidth="2"/></pattern>
 </defs>;
const Exterior:React.FC=()=> <g>
 <rect width="1080" height="1920" fill="url(#night)"/>
 <path d="M0 700 Q120 540 240 640 T520 625 T790 600 T1080 660 V1920H0Z" fill="#1B2B32"/>
 {Array.from({length:8},(_,i)=><g key={i} transform={`translate(${i*168-95} 430)`} opacity={i%2?.6:.8}><path d="M45 770 L47 250" stroke="#101C1E" strokeWidth={15+i%3*3}/><path d="M46 268 Q-20 160 37 103 Q-2 33 82 11 Q150 -14 151 103 Q232 153 130 279Z" fill="#132329"/></g>)}
 <path d="M145 790 L530 545 L910 770 L880 825 H164Z" fill="#140F0C"/>
 <path d="M207 796 H857 V1235 H207Z" fill="#3F2D1D" stroke="#100B08" strokeWidth="24"/>
 <rect x="219" y="808" width="626" height="424" fill="url(#mat)" opacity=".8"/>
 <path d="M185 1230H874 L921 1280 H145Z" fill="#17100C" />
 {[238,355,480,633,798].map(x=><path key={x} d={`M${x} 1270V1530`} stroke="#1A120D" strokeWidth="33"/>)}
 <rect x="410" y="863" width="235" height="260" fill="#100B08" stroke="#100B08" strokeWidth="18"/>
 <rect x="427" y="883" width="201" height="223" fill="#F0B35D"/>
 <rect x="427" y="883" width="201" height="223" fill="url(#lampLight)"/>
 <path d="M526 883V1105M427 990H628" stroke="#301A0B" strokeWidth="19"/>
 <path d="M215 1205H852" stroke="#AD7338" strokeWidth="14" opacity=".5"/>
 <path d="M677 1276V1475M778 1276V1475M650 1485H798M665 1435H786M677 1390H781M682 1340H776" fill="none" stroke="#24170F" strokeWidth="23"/>
 <rect width="1080" height="1920" fill="#000" opacity=".14"/>
 </g>;
const Bed:React.FC<{close?:boolean}>=({close=false})=><g>
 <path d="M129 1049 L744 1049 L763 1130 L144 1138Z" fill="#21160E" stroke="#0C0908" strokeWidth="16"/>
 <path d="M143 1125L135 1279M744 1120L761 1259" stroke="#1C100B" strokeWidth="26"/>
 <path d="M168 1008Q410 975 720 1008 L738 1078 L143 1085Z" fill="#35251A"/>
 <path d="M176 1003Q400 960 692 1002" fill="none" stroke="#876244" strokeWidth="12" opacity=".52"/>
 <path d="M165 1009Q320 925 522 989" fill="#45301F" opacity=".5"/>
 </g>;
const Room:React.FC<{shot:Shot}>=({shot})=><g>
 <rect width="1080" height="1920" fill="url(#wall)"/>
 <rect width="1080" height="1380" fill="url(#mat)" opacity=".34"/>
 <path d="M0 430H1080M0 800H1080M0 1150H1080" stroke="#2B1A11" strokeWidth="21"/>
 {[30,315,755,1030].map(x=><path key={x} d={`M${x} 0V1490`} stroke="#302015" strokeWidth="29"/>)}
 <path d="M0 1188L1080 1220V1920H0Z" fill="#342217"/>
 <path d="M0 1260H1080V1920H0Z" fill="url(#planks)" opacity=".83"/>
 <path d="M0 1262H1080" stroke="#B47B3F" strokeWidth="12" opacity=".38"/>
 <rect x="825" y="572" width="216" height="654" rx="5" fill="#27180F" stroke="#120E0A" strokeWidth="17"/>
 <rect x="849" y="590" width="170" height="610" fill="#6E4725"/>
 {Array.from({length:5},(_,i)=><path key={i} d={`M${876+i*25} 600V1193`} stroke="#29170F" strokeWidth="4" opacity=".4"/>)}
 <path d="M852 876H1015" stroke="#24160D" strokeWidth="21"/>
 <rect x="866" y="867" width="146" height="20" rx="4" fill="#BA8547"/>
 <circle cx="980" cy="870" r="10" fill="#D4AA66"/>
 <rect x="165" y="604" width="266" height="245" fill="#160F0C" stroke="#291A12" strokeWidth="27"/>
 <rect x="191" y="633" width="214" height="188" fill="#2B353A"/>
 <path d="M295 629V824M191 725H405" stroke="#60452D" strokeWidth="20"/>
 <path d="M195 695Q290 673 402 689" stroke="#E7AA53" strokeOpacity=".14" strokeWidth="8"/>
 <Bed/>
 <ellipse cx="545" cy="835" rx="570" ry="590" fill="url(#lampLight)" opacity=".58"/>
 {shot.environment==='underbed'&& <g><path d="M220 1230L685 1228L705 1294L204 1304Z" fill="#100B08"/><path d="M241 1276Q440 1270 650 1280" stroke="#FFF0BD" strokeWidth="12" filter="url(#flameBlur)"/><path d="M241 1276Q440 1270 650 1280" stroke="#F0D39A" strokeWidth="3"/></g>}
 </g>;
export const Environment:React.FC<{shot:Shot}>=({shot})=>shot.environment==='outside'?<Exterior/>:shot.environment==='black'?<rect width="1080" height="1920" fill="#050405"/>:<Room shot={shot}/>;
export const Lamp:React.FC<{seconds:number;seed:number}>=({seconds,seed})=>{
 const sway=Math.sin(seconds*13+seed)*2+Math.sin(seconds*7.9)*2; const pulse=1+.045*Math.sin(seconds*8.7+seed);
 return <g transform="translate(545 956)">
 <ellipse cy="-50" rx={210*pulse} ry={230*pulse} fill="url(#lampLight)" opacity=".7"/>
 <path d="M-22 0Q-45 -68 -24 -82 H24 Q45 -68 22 0Z" fill="#3D2C1C" stroke="#A67B47" strokeWidth="5"/>
 <ellipse cy="-79" rx="25" ry="8" fill="#E8AB52"/>
 <g transform={`translate(${sway} -101) scale(${pulse})`}>
  <path d="M0 -71Q-30 -34 -18 -8 Q0 17 17 -9 Q29 -31 0 -71Z" fill="#E7AA53" filter="url(#flameBlur)"/>
  <path d="M0 -60Q-30 -22 -14 0 Q0 17 14 0 Q28 -23 0 -60Z" fill="#F1BA60"/>
  <path d="M0 -37Q-11 -14 -7 -4 Q0 7 9 -4 Q14 -16 0 -37Z" fill="#FFF0BD"/>
 </g>
 <path d="M-55 2H56L43 16H-42Z" fill="#26160E"/>
 </g>;
};
