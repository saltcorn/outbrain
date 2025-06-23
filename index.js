const db = require("@saltcorn/data/db");
const Form = require("@saltcorn/data/models/form");
const Field = require("@saltcorn/data/models/field");
const Table = require("@saltcorn/data/models/table");
const FieldRepeat = require("@saltcorn/data/models/fieldrepeat");
const Workflow = require("@saltcorn/data/models/workflow");
const { eval_expression } = require("@saltcorn/data/models/expression");
const {
  text,
  div,
  h5,
  style,
  a,
  script,
  pre,
  domReady,
  i,
  text_attr,
} = require("@saltcorn/markup/tags");
const { mkTable } = require("@saltcorn/markup");
const { readState } = require("@saltcorn/data/plugin-helper");
const {
  getMarketers,
  getCampaignsForMarketer,
  getPromotedLinksForCampaign,
  getPromotedContentReport,
  postPromotedLinkForCampaign,
} = require("./api");
const configuration_workflow = () =>
  new Workflow({
    steps: [
      {
        name: "views",
        form: async (context) => {
          return new Form({
            fields: [
              {
                name: "token",
                label: "Token",
                type: "String",
                required: true,
                fieldview: "textarea",
                sublabel: "Outbrain Aplify API token",
              },
            ],
          });
        },
      },
    ],
  });

module.exports = {
  sc_plugin_api_version: 1,
  plugin_name: "outbrain",
  configuration_workflow,
  //table_providers: require("./table-provider.js"),
  functions: (cfg) => ({
    get_outbrain_marketers: {
      async run(query) {
        return await getMarketers(query, cfg);
      },
      isAsync: true,
      description: "Get Outbrain marketers",
      arguments: [],
    },
    get_outbrain_marketer_campaigns: {
      async run(marketerId, query) {
        return await getCampaignsForMarketer(marketerId, query, cfg);
      },
      isAsync: true,
      description: "Get Outbrain campaigns for marketer",
      arguments: [{ name: "marketerId", type: "String" }],
    },
    get_outbrain_campaign_promoted_links: {
      async run(campaignId, query) {
        return await getPromotedLinksForCampaign(campaignId, query, cfg);
      },
      isAsync: true,
      description: "Get Outbrain promoted links for campaign",
      arguments: [{ name: "campaignId", type: "String" }],
    },
    create_outbrain_campaign_promoted_link: {
      async run(campaignId, adSpec) {
        return await postPromotedLinkForCampaign(campaignId, adSpec, cfg);
      },
      isAsync: true,
      description: "Create new promoted link",
      arguments: [
        { name: "campaignId", type: "String" },
        { name: "adSpec", type: "JSON" },
      ],
    },
    get_outbrain_promoted_content_report: {
      async run(marketerId, query) {
        /* Query example: 
        {
          from: "2015-12-22",
          to: "2016-01-20",
          limit: 10,
          offset: 3,
          sort: "-ctr",
          filter: "clicks+gt+99",
          includeArchivedCampaigns: true,
          budgetId: "adc4fc128ab0419ababf4b02153ee75f3c",
          campaignId:
            "e75f3cadc4fc128ab0419ababf4b02153e, 0069fc0fe9598f99b4c528f0881cd74b4b",
          promotedLinkId: "19ababf4b02153ee75f3cadc4fc128ab04",
          includeConversionDetails: false,
          conversionsByClickDate: true,
        };
        */
        return await getPromotedContentReport(marketerId, query, cfg);
      },
      isAsync: true,
      description: "Get Outbrain promoted links for campaign",
      arguments: [
        { name: "marketerId", type: "String" },
        { name: "query", type: "JSON" },
      ],
    },
  }),
  actions: (cfg) => ({
    //outbrain_sync: require("./sync-action")(cfg),
    //caldav_edit: require("./add-action")(cfg),
  }),
};

let x = {
  from: "2015-12-22",
  to: "2016-01-20",
  limit: 10,
  offset: 3,
  sort: "-ctr",
  filter: "clicks+gt+99",
  includeArchivedCampaigns: "true",
  budgetId: "adc4fc128ab0419ababf4b02153ee75f3c",
  campaignId:
    "e75f3cadc4fc128ab0419ababf4b02153e, 0069fc0fe9598f99b4c528f0881cd74b4b",
  promotedLinkId: "19ababf4b02153ee75f3cadc4fc128ab04",
  includeConversionDetails: "false",
  conversionsByClickDate: "true",
};
