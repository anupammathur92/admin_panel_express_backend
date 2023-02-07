import pkg from 'nexus';
const { makeSchema, declarativeWrappingPlugin } = pkg;
import path from 'path';

import * as typedefs from './resources/index.js';

const schema = makeSchema({
  //types: [User,OutputResponse,CheckLoginResponse,Query,CreateUserMutation,UpdateUserMutation,DeleteUserMutation],
  types : [typedefs],
  plugins: [declarativeWrappingPlugin()],
  shouldGenerateArtifacts: true,
  outputs: {
    schema: path.resolve('./') + '/schema.graphql',
    typegen: path.resolve('./') + '/generated/nexus.ts',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});

export default schema;