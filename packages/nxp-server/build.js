const s = require('shelljs');

s.rm('-rf', 'build');
s.rm('-rf', 'reports');
s.mkdir('build');
s.mkdir('reports');
// s.mkdir('-p','logs');
s.mkdir('-p', 'build/src/graphql');
s.cp(`.${s.env.NODE_ENV}.env`, `build/.${s.env.NODE_ENV}.env`);
s.cp('jwtRS256.key', 'build/');
s.cp('jwtRS256.key.pub', 'build/');
s.cp('-R', 'public', 'build/public');
s.cp('-R', 'src/graphql/schema', 'build/src/graphql');
s.mkdir('-p', 'build/src/swagger');
s.cp('src/swagger/Api.yaml', 'build/src/swagger/Api.yaml');
