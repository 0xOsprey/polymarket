import { updateCommandMetadata } from "@raycast/api";
import _ from "lodash";
import fetch from "node-fetch";

async function fetchStats() {
  //const { apiKey } = getPreferenceValues();
  
  var stats: string[] = [];
  var data: any = {};
  var data2: any = {};

  var response = await fetch("https://clob.polymarket.com/rewards/markets/0xdd22472e552920b8438158ea7238bfadfa4f736aa4cee91a6b86c39ead110917");
  if (!response.ok) {
    throw Error(`Failed fetching stats (${response.statusText} - ${response.status})`);
  }
  data = await response.json();

  var response = await fetch("https://clob.polymarket.com/rewards/markets/0x14018049e265a2d88f284be9588e2e3542e3a3df08ccdb344d28355dd7fdd8ef");
  if (!response.ok) {
    throw Error(`Failed fetching stats (${response.statusText} - ${response.status})`);
  }
  data2 = await response.json();
  const trump = data["data"][0]["tokens"][0]["price"]*100;
  const biden = data2["data"][0]["tokens"][0]["price"]*100;
  const other = 100 - trump - biden;
  console.log(trump, biden, other)
  stats.push(trump.toString(), biden.toString(), other.toString())
  return stats;
}

function formatCommandSubtitle(jsonStats: string[]) {
  return `Trump ${jsonStats[0]}% | Biden: ${jsonStats[1]}% | Other: ${jsonStats[2]}%`;
}

export default async function command() {
  const jsonStats = await fetchStats();
  const subtitle = formatCommandSubtitle(jsonStats);

  updateCommandMetadata({ subtitle });
}