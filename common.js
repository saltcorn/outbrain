const fetch = require("node-fetch");

const base = "https://api.outbrain.com/amplify/v0.1";

const getAPI = async (urlPath, { token }) => {
  const response = await fetch(`${base}${urlPath}`, {
    headers: {
      "ob-token-v1": token,
    },
  });
  return await response.json();
};

//https://private-anon-3cbd964d5b-amplifyv01.apiary-mock.com/marketers

const getMarketers = async (cfg) => {
  return await getAPI(`/marketers`, cfg);
};

const getCampaign = async (campaignId, cfg) => {
  /*
GEThttps://private-anon-3cbd964d5b-amplifyv01.apiary-mock.com/campaigns/00f4b02153ee75f3c9dc4fc128ab0411ab?extraFields=CustomAudience,Locations,InterestsTargeting,BidBySections,BlockedSites,PlatformTargeting,CampaignOptimization,Scheduling,IABCategories,CampaignPixels*/
  const url = `/campaigns/${campaignId}?extraFields=CustomAudience,Locations,InterestsTargeting,BidBySections,BlockedSites,PlatformTargeting,CampaignOptimization,Scheduling,IABCategories,CampaignPixels`;
  return await getAPI(url, cfg);
};

const getCampaignsForMarketer = async (marketerId, cfg) => {
  return await getAPI(`/marketers/${marketerId}/campaigns`, cfg);
};

const getPromotedLinksForCampaign = async (campaignId, cfg) => {
  // /campaigns/abf4b02153ee75f3cadc4fc128ab0419ab/promotedLinks?enabled=true&statuses=APPROVED,PENDING,REJECTED&limit=200&offset=3&sort=-creationTime&promotedLinkImageWidth=100&promotedLinkImageHeight=100
  return await getAPI(`/campaigns/${campaignId}/promotedLinks`, cfg);
};

module.exports = {
  getMarketers,
  getCampaign,
  getCampaignsForMarketer,
  getPromotedLinksForCampaign,
};
