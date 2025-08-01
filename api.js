const { objectToQueryString } = require("@saltcorn/data/utils");
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

const postAPI = async (urlPath, body, { token }) => {
  const response = await fetch(`${base}${urlPath}`, {
    method: "POST",
    headers: {
      "ob-token-v1": token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

//https://private-anon-3cbd964d5b-amplifyv01.apiary-mock.com/marketers

const getMarketers = async (q, cfg) => {
  const qs = objectToQueryString(q || {}) || "";
  return await getAPI(`/marketers?${qs}`, cfg);
};

const getCampaign = async (campaignId, cfg) => {
  /*
GEThttps://private-anon-3cbd964d5b-amplifyv01.apiary-mock.com/campaigns/00f4b02153ee75f3c9dc4fc128ab0411ab?extraFields=CustomAudience,Locations,InterestsTargeting,BidBySections,BlockedSites,PlatformTargeting,CampaignOptimization,Scheduling,IABCategories,CampaignPixels*/
  const url = `/campaigns/${campaignId}?extraFields=CustomAudience,Locations,InterestsTargeting,BidBySections,BlockedSites,PlatformTargeting,CampaignOptimization,Scheduling,IABCategories,CampaignPixels`;
  return await getAPI(url, cfg);
};

const getCampaignsForMarketer = async (marketerId, q, cfg) => {
  const qs = objectToQueryString(q || {}) || "";
  return await getAPI(`/marketers/${marketerId}/campaigns?${qs}`, cfg);
};

const getPromotedLinksForCampaign = async (campaignId, q, cfg) => {
  const qs = objectToQueryString(q || {}) || "";

  // /campaigns/abf4b02153ee75f3cadc4fc128ab0419ab/promotedLinks?enabled=true&statuses=APPROVED,PENDING,REJECTED&limit=200&offset=3&sort=-creationTime&promotedLinkImageWidth=100&promotedLinkImageHeight=100
  return await getAPI(`/campaigns/${campaignId}/promotedLinks?${qs}`, cfg);
};

const postPromotedLinkForCampaign = async (campaignId, adSpec, cfg) => {
  return await postAPI(`/campaigns/${campaignId}/promotedLinks`, adSpec, cfg);
};

const getPromotedContentReport = async (marketerId, q, cfg) => {
  // /reports/marketers/abf4b02153ee75f3cadc4fc128ab0419ab/promotedContent?from=2015-12-22&to=2016-01-20&limit=10&offset=3&sort=-ctr&filter=clicks+gt+99&includeArchivedCampaigns=true&budgetId=adc4fc128ab0419ababf4b02153ee75f3c&campaignId=e75f3cadc4fc128ab0419ababf4b02153e, 0069fc0fe9598f99b4c528f0881cd74b4b&promotedLinkId=19ababf4b02153ee75f3cadc4fc128ab04&includeConversionDetails=false&conversionsByClickDate=true
  const qs = objectToQueryString(q || {}) || "";
  return await getAPI(
    `/reports/marketers/${marketerId}/promotedContent?${qs}`,
    cfg
  );
};

module.exports = {
  getMarketers,
  getCampaign,
  getCampaignsForMarketer,
  getPromotedLinksForCampaign,
  getPromotedContentReport,
  postPromotedLinkForCampaign,
};
