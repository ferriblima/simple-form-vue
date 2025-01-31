module.exports = {
    devServer: {
      host: '0.0.0.0', // Ensure the dev server is available on all interfaces
      port: 8080,      // Your desired port
      allowedHosts: [
        'simple-form-vue.co',  // Add your custom domain
        'localhost',
        '.your-other-allowed-hosts.com' // You can use a wildcard prefix if needed
      ],
      // Option 1: If you want to disable host checking entirely (use with caution)
      // disableHostCheck: true,
      
      // Option 2: You can also set a public property if necessary:
      // public: 'simple-form-vue.co:8080',
    }
  };
  