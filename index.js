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
const { getMarketers, getCampaignsForMarketer } = require("./common");
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
      async run() {
        return await getMarketers(cfg);
      },
      isAsync: true,
      description: "Get Outbrain marketers",
      arguments: [],
    },
    get_outbrain_marketer_campaigns: {
      async run(marketerId) {
        return await getCampaignsForMarketer(marketerId, cfg);
      },
      isAsync: true,
      description: "Get Outbrain campagigns for marketer",
      arguments: [{ name: "marketerId", type: "String" }],
    },
  }),
  actions: (cfg) => ({
    //outbrain_sync: require("./sync-action")(cfg),
    //caldav_edit: require("./add-action")(cfg),
  }),
};
