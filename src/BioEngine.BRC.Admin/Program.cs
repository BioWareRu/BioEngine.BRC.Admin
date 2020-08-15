using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BioEngine.BRC.Admin
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var application = CreateApplication(args);
            application.GetHostBuilder().ConfigureWebHost(builder =>
            {
                builder.ConfigureKestrel(options =>
                {
                    options.Limits.MaxRequestBodySize = 1 * 1024 * 1024 * 1024; // 1 gb
                });
            });
            await application.RunAsync<Startup>();
        }

        // need for migrations
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            CreateApplication(args).CreateBasicHostBuilder<Startup>();

        public static BRCAdminApplication CreateApplication(string[] args) => new BRCAdminApplication(args);
    }
}
