// module.exports = {
//   apps: [
//     {
//       name: "nuxt",
//       script: "./node_modules/.bin/nuxt",
//       env: {
//         // HOST: "0.0.0.0",
//         PORT: 12348,
//         NODE_ENV: "production"
//       }
//     }
//   ]
// };


module.exports = {
<<<<<<< HEAD
//   apps : [{
//     script: 'index.js',
//     watch: '.'
//   }, {
//     script: './service-worker/',
//     watch: ['./service-worker']
//   }],
  
  apps : [{
        name      : 'adSolider', // App name that shows in `pm2 ls`
        exec_mode : 'cluster', // enables clustering
        instances : 1, // or an integer
        cwd       : './', // only if using a subdirectory
        // These are our updated properties
        script: "./node_modules/.bin/nuxt",
        args      : "start",
        env: {
        HOST: "0.0.0.0",
        PORT: 55555,
        NODE_ENV: "production"
      }
        
    }],

//   deploy : {
//     production : {
//       user : 'SSH_USERNAME',
//       host : 'SSH_HOSTMACHINE',
//       ref  : 'origin/master',
//       repo : 'GIT_REPOSITORY',
//       path : 'DESTINATION_PATH',
//       'pre-deploy-local': '',
//       'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
//       'pre-setup': ''
//     }
//   }
=======
    apps: [{
        name: 'adSolider', // App name that shows in `pm2 ls`
        exec_mode: 'cluster', // enables clustering
        instances: 1, // or an integer
        cwd: './', // only if using a subdirectory
        // These are our updated properties
        script: "./node_modules/.bin/nuxt",
        args: "start",
        env: {
            HOST: "0.0.0.0",
            PORT: 55555,
            NODE_ENV: "production"
        }

    }],
>>>>>>> e5027e882bcc969d2fbdc6fe72c953299a96fac6
};