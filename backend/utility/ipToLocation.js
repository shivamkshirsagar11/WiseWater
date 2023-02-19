
import * as dotenv from 'dotenv'
dotenv.config();

import geoip from 'geoip-lite';

export async function ipToLocation(IP) {
  var geo = geoip.lookup(IP);
  console.log("from geo function")
  console.log(IP);
  console.log(geo);
return 0;
  }
