const fetch = require("node-fetch");

const base = "https://api.outbrain.com/amplify/v0.1";

const getAPI = async (urlPath, { token }) => {
  const url = `${base}/`;
  const response = await fetch(`${base}${urlPath}`);
  return await response.json();
};

//https://private-anon-3cbd964d5b-amplifyv01.apiary-mock.com/marketers

const getMarketers = async (opts) => {
  return await getAPI(`/marketers`, opts);
};

const getCampaign = async (campaignId, { token }) => {
  /*
https://private-anon-3cbd964d5b-amplifyv01.apiary-mock.com/campaigns/00f4b02153ee75f3c9dc4fc128ab0411ab,00f863c5674af5c5f63415500f699a04e5/multiple?extraFields=CustomAudience,Locations,InterestsTargeting,BidBySections,BlockedSites,PlatformTargeting,CampaignOptimization,Scheduling,IABCategories,CampaignPixels
*/
};

module.exports = { getMarketers };
