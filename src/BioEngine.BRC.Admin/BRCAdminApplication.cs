using System;
using BioEngine.BRC.Common;
using BioEngine.BRC.Common.Facebook;
using BioEngine.BRC.Common.IPB;
using BioEngine.BRC.Common.IPB.Auth;
using BioEngine.BRC.Common.Seo;
using BioEngine.BRC.Common.Twitter;
using JetBrains.Annotations;

namespace BioEngine.BRC.Admin
{
    public class BRCAdminApplication : BRCApplication
    {
        public BRCAdminApplication(string[] args) : base(args)
        {
            AddPostgresDb()
                .AddBrcDomain()
                .AddElasticSearch()
                .AddElasticStack()
                .AddS3Storage()
                .AddModule<SeoModule>()
                .AddModule<IPBApiModule, IPBApiModuleConfig>((configuration, env, moduleConfig) =>
                {
                    if (!Uri.TryCreate(configuration["BE_IPB_URL"], UriKind.Absolute, out var ipbUrl))
                    {
                        throw new ArgumentException($"Can't parse IPB url; {configuration["BE_IPB_URL"]}");
                    }

                    moduleConfig.Url = ipbUrl;


                    moduleConfig.ApiReadonlyKey = configuration["BE_IPB_API_READONLY_KEY"];
                    moduleConfig.ApiPublishKey = configuration["BE_IPB_API_PUBLISH_KEY"];
                })
                .AddModule<TwitterModule>()
                .AddModule<FacebookModule>()
                .AddIpbUsers<IPBSiteUsersModule, IPBSiteUsersModuleConfig, IPBSiteCurrentUserProvider>(true);
        }
    }
}