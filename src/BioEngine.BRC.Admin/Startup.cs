using System;
using BioEngine.BRC.Admin.Components;
using BioEngine.BRC.Common;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using BioEngine.BRC.Common.Web;
using BioEngine.BRC.Common.Web.RenderService;
using Microsoft.AspNetCore.Routing;
using Radzen;

namespace BioEngine.BRC.Admin
{
    public class Startup : BRCStartup
    {
        public Startup(IConfiguration configuration, IHostEnvironment environment) : base(configuration, environment)
        {
        }

        protected override void ConfigureAppServices(IServiceCollection services)
        {
            base.ConfigureAppServices(services);
            services.AddRazorPages(options =>
            {
                options.Conventions.AuthorizeFolder("/");
            });
            services.AddServerSideBlazor();
            services.AddScoped<IContentRender, ContentRender>();
            services.AddScoped<BRCPostsPublisher>();
            services.Configure<BrcAdminOptions>(options =>
            {
                options.DefaultMainSiteId = Guid.Parse(Configuration["BE_DEFAULT_MAIN_SITE_ID"]);
            });
            services.AddScoped<IViewRenderService, ViewRenderService>();
            services.AddScoped<DialogService>();
            services.AddScoped<NotificationService>();
        }

        protected override void ConfigureAfterRoutingMiddleware(IApplicationBuilder app)
        {
            base.ConfigureAfterRoutingMiddleware(app);
            app.UseAuthentication();
            app.UseAuthorization();
        }
        
        protected override void ConfigureEndpoints(IApplicationBuilder app, IEndpointRouteBuilder endpoints)
        {
            base.ConfigureEndpoints(app, endpoints);
            endpoints.AddBrcRoutes();
            endpoints.MapBlazorHub();
            endpoints.MapFallbackToPage("/_Host");
        }
    }

    public class BrcAdminOptions
    {
        public Guid DefaultMainSiteId { get; set; }
    }
}