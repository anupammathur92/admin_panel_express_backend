import pkg from 'nexus';
const { makeSchema, declarativeWrappingPlugin } = pkg;
import path from 'path';

const schema = makeSchema({
  types: ['Query'],
  plugins: [declarativeWrappingPlugin()],
  shouldGenerateArtifacts: true,
  outputs: {
    schema: path.resolve('./') + '/src/schema.graphql',
    typegen: path.resolve('./') + '/src/generated/nexus.ts',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },,
    ],
  },
});

export default schema;
