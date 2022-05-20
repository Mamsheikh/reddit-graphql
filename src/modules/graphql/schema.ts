import { makeSchema } from 'nexus';
import path from 'path';
import * as types from './types';

const schema = makeSchema({
  types,
  contextType: {
    module: path.join(process.cwd(), './src/types/Context.ts'),
    export: 'Context',
  },
  outputs: {
    schema: path.join(process.cwd(), './generated/schema.graphql'),
    typegen: path.join(process.cwd(), './generated/nexus-typegen.d.ts'),
  },
});

export { schema };
