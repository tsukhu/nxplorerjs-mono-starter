const s = require('shelljs');

s.rm('-rf', 'build');
s.rm('-rf', 'reports');
s.mkdir('build');
s.mkdir('-p', 'build/src/graphql');
s.cp(`.${s.env.NODE_ENV}.env`, `build/.${s.env.NODE_ENV}.env`);
s.cp('-R', 'src/graphql/schema', 'build/src/graphql');
