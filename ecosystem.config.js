module.exports = {
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
};