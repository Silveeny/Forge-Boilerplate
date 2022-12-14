/////////////////////////////////////////////////////////////////////
// PRODUCTION configuration
//
/////////////////////////////////////////////////////////////////////
const HOST_URL = `https://arc-forge.herokuapp.com`
const PORT = 443

const config = {

  env: 'production',

  client: {
    // this the public host name of your server for the
    // client socket to connect.
    // eg. https://myforgeapp.mydomain.com
    viewerTheme: 'light-theme',
    storageVersion: 4.0,
    host: `${HOST_URL}`,
    env: 'production',
    port: PORT
  },

  gallery: {
    lifetime: 60 * 60 * 24 * 30, // 30 days
    // whiteList of user emails who can upload
    // to the gallery without limit
    whiteList:[
      /@arcadis.com/,
      /@protonmail.com/ // match only @autodesk.com accounts
    ],
    // number of active models for
    // non white-listed user
    uploadLimit: 0,
    bucket: {
      bucketKey: 'forge-viewer-final',
      policyKey: 'Transient'
    }
  },

  meta: {
    bucket: {
      bucketKey: 'forge-viewer-meta-final',
      policyKey: 'Persistent'
    }
  },

  layouts: {
    index: 'production.index.ejs'
  },

  forge: {

    oauth: {
      redirectUri: `${HOST_URL}/api/forge/callback/oauth`,
      authenticationUri: '/authentication/v1/authenticate',
      refreshTokenUri: '/authentication/v1/refreshtoken',
      authorizationUri: '/authentication/v1/authorize',
      accessTokenUri: '/authentication/v1/gettoken',

      baseUri: `https://developer.api.autodesk.com`,
      clientSecret: process.env.FORGE_CLIENT_SECRET,
      clientId: process.env.FORGE_CLIENT_ID,

      scope: [
        'data:read',
        'data:write',
        'data:create',
        'data:search',
        'bucket:read',
        'bucket:create',
        'bucket:delete',
        'viewables:read'
      ]
    },

    hooks: {
      callbackUrl: `${HOST_URL}/api/forge/callback/hooks`
      //callbackUrl: `https://dcc54956.ngrok.io/api/forge/callback/hooks`
    },

    viewer: {
      viewer3D: 'https://developer.api.autodesk.com/derivativeservice/v2/viewers/viewer3D.min.js?v=6.0',
      style:    'https://developer.api.autodesk.com/derivativeservice/v2/viewers/style.css?v=6.0'
    }
  },

  database: {
    type: 'mongo',
    //connectionString: 'mongodb+srv://salazar:<password>@forge-lexq8.gcp.mongodb.net/test?retryWrites=true',
    connectionString: process.env.RCDB_CONNECTION_STRING,
    dbName: process.env.RCDB_DBNAME,
    dbhost: process.env.RCDB_DBHOST,
    user: process.env.RCDB_USER,
    pass: process.env.RCDB_PASS,
    port: process.env.RCDB_PORT,
    models: {
      configurator: {
        collection:'configurator.models'
      },
      gallery: {
        collection:'gallery.models'
      },
      rcdb: {
        collection:'rcdb.models'
      }
    },
    materials: {
      rcdb: {
        collection:'rcdb.materials'
      }
    },
    users: {
      collection:'rcdb.users'
    }
  }
}

module.exports = config