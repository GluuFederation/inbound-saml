import { IMetadata } from '../get-saml-metadata/src/application/protocols/IMetadataTypes'
import * as fs from 'fs'
import { makeXmlMetadata } from '../get-saml-metadata/src/domain/factories/makeXmlMetadata'

export const validFilePath = process.cwd() + '/src/testdata/shibIdpMetadata.xml'
export const validMetadataString = fs.readFileSync(validFilePath).toString()
export const validXmlMetadata = makeXmlMetadata({ xml: validMetadataString })

export const fakeMetadata: IMetadata = {
  entityID: 'Nihil rerum maxime. Qui amet sed error. Earum iste consequatur sapiente. Occaecati reiciendis et.',
  idpssoDescriptor: {
    errorURL: 'Explicabo enim corrupti quae iusto corporis dolor itaque inventore maiores.',
    protocolSupportEnumeration: 'Ipsam sit libero excepturi earum molestiae aliquam nam.',
    keyDescriptor: [
      {
        use: 'signing',
        keyInfo: {
          x509Data: {
            x509Certificate: 'Voluptatum unde sunt iure. Dolores enim dolor impedit velit illo repellendus. Aspernatur dolorum est dolor quo eaque id qui. Quibusdam eveniet sit maiores nihil impedit accusantium beatae dolorem dignissimos. Soluta sint id enim voluptas repellat saepe ipsam. Quasi reiciendis quia.'
          }
        }
      },
      {
        use: 'signing',
        keyInfo: {
          x509Data: {
            x509Certificate: 'blanditiis'
          }
        }
      },
      {
        use: 'Debitis animi minus accusamus necessitatibus. Id quia ipsa rerum quas voluptate. Tempora doloremque nam quibusdam. Velit ratione autem eveniet dolore magnam consectetur voluptas soluta facere.',
        keyInfo: {
          x509Data: {
            x509Certificate: 'Debitis et qui minus eos temporibus ab dolore iure veniam.'
          }
        }
      },
      {
        use: 'Quo rerum nihil et alias ex quidem ab hic laudantium. Totam ut autem perferendis accusantium ex consequuntur. Consequatur id aut aut et voluptatibus voluptas facilis quis. Repellendus id id dolorem consequatur laboriosam. Tenetur qui voluptatem non ex dolores et praesentium et.\n \rVel voluptatibus quae sit non voluptate est labore. Eaque harum ut laudantium facilis amet voluptate non. Qui rem blanditiis eius.\n \rMaxime doloremque molestiae recusandae fugit fugiat voluptas. Ut ut debitis ut est sed atque est ad hic. Earum omnis illum mollitia eaque dignissimos hic id fuga magni. Dolor consequatur incidunt mollitia dolores dolorem tenetur facilis. Et corrupti ut pariatur mollitia delectus molestiae blanditiis et. Fugiat nihil sed quam atque qui pariatur in corporis molestias.',
        keyInfo: {
          x509Data: {
            x509Certificate: 'Pariatur dolorem soluta commodi et expedita error nihil voluptatum ut. Dolorum incidunt molestiae cupiditate.'
          }
        }
      }
    ],
    singleLogoutService: [
      {
        binding: 'eum',
        location: 'Fugit est quam deleniti sint.'
      },
      {
        binding: 'Libero commodi debitis voluptatem assumenda eum.',
        location: 'Soluta eos laboriosam aliquid recusandae et.\nOdio et ab quibusdam mollitia vel consequuntur voluptatibus quaerat.\nOmnis quia aut tempora.\nSed itaque consequatur deleniti ipsum id.'
      }
    ],
    nameIDFormat: [
      'Nesciunt rerum sint ut officiis voluptatem. Doloribus voluptate nostrum odio vitae veniam qui et ullam debitis.',
      'Ea porro et et vel. Earum consectetur officia. Numquam nihil harum ex nisi enim repudiandae voluptatum. Et qui ut deserunt fugit excepturi voluptas accusantium. Quis ut blanditiis et consequatur minima provident quasi. Accusantium ipsa sit exercitationem nihil.',
      'Repudiandae asperiores ex beatae facilis tempore esse velit labore. Et et dolorem eligendi non non. Rerum eum in tempore dolorem ratione. Repellendus sit debitis voluptas adipisci velit omnis ipsam voluptatem.\n \rArchitecto sit reiciendis quod explicabo totam. Rerum delectus ut. Quia nulla laboriosam repudiandae sit quod enim incidunt quia eum.\n \rLibero eos sed voluptatum aliquid expedita. Consequatur impedit debitis suscipit sed nam. Non impedit dolores porro totam porro fugiat repudiandae repellat corporis. Quod et rerum. Rerum aut magni voluptatem illo provident aspernatur voluptatem alias. Doloribus non temporibus qui similique architecto et eveniet error.',
      'Inventore quas deleniti quos perferendis neque cum et.',
      'Maiores sit beatae et qui aliquid non officiis voluptas voluptate. Ut porro tempore. Et nihil quia beatae.\n \rVoluptate et aliquid suscipit id quaerat qui rerum. Ut et dolores. Ad id inventore nihil sit. Deleniti animi labore exercitationem totam quia nostrum libero dolor. Ab corrupti numquam nisi repudiandae consequatur.\n \rQuas reprehenderit repellendus. Distinctio ut minima animi iure reiciendis iste in sed. Id sapiente quidem reprehenderit.'
    ],
    singleSignOnService: [
      {
        binding: 'Earum ut quasi suscipit fuga exercitationem natus cum. Doloremque voluptas quisquam.',
        location: 'Vitae quasi velit exercitationem maxime quo eveniet. Odio quia sit omnis sequi similique ratione nihil aliquid enim. Optio sunt molestiae totam. Ea modi repudiandae. Hic suscipit quod cupiditate et. Qui voluptatem quia voluptates consequuntur facilis.'
      },
      {
        binding: 'Itaque autem est pariatur.\nMollitia quia ut quia.',
        location: 'Exercitationem rerum sunt dolorem sit rerum reprehenderit. Id praesentium commodi. Hic repudiandae labore qui. In vero sit earum quae illo. Dolore deserunt quod dicta dolore doloremque porro atque.'
      },
      {
        binding: 'Illum libero qui consequatur. Consequatur qui suscipit ratione ab debitis quasi ex minima. Aut sequi itaque necessitatibus aut architecto veritatis. Deserunt nihil in voluptate blanditiis reprehenderit consectetur non quo et.',
        location: 'Nihil sapiente rem molestiae quia.'
      },
      {
        binding: 'voluptates',
        location: 'delectus'
      },
      {
        binding: 'nam',
        location: 'Aut omnis recusandae modi neque ea.'
      },
      {
        binding: 'eveniet beatae veniam',
        location: 'Illum consequatur ut.\nAlias nihil deleniti corrupti eveniet cumque repellendus eaque voluptas.\nSaepe neque quos explicabo optio ea earum eveniet quia.\nEt aperiam sed hic dolores repellendus rerum sed adipisci et.\nSit illo molestias occaecati aperiam omnis consequatur.'
      },
      {
        binding: 'Quia exercitationem ut et vel dignissimos dicta. Numquam suscipit doloribus nostrum voluptas. Porro et totam sequi veritatis ipsam similique odio. Consectetur culpa dolorem sequi dolorum eos dolor ratione quo. Quos et dolores et facilis consequuntur nemo saepe quisquam aspernatur.\n \rVero vel explicabo veniam quod cupiditate sed dolorum. Adipisci dicta tempore molestiae autem praesentium deserunt deleniti. Facere consequatur quidem fuga a mollitia. Optio fugiat et aliquid. Earum neque enim adipisci.\n \rAut officia perferendis eos ipsum omnis nobis harum quaerat. Amet facere quia incidunt. Assumenda velit neque.',
        location: 'Atque neque est facilis aut ex distinctio error aspernatur. Et voluptatem porro officia at tempora. Aperiam consectetur enim est. Amet sit accusantium error facere. Esse tempore voluptatem. Fuga dicta sunt omnis ea.'
      },
      {
        binding: 'Et nisi cum magnam sunt et similique commodi. Commodi accusantium natus pariatur ipsa et labore. Commodi id perspiciatis dolorum cum laboriosam in earum. Harum ad earum. Qui quidem repellat tempora et rerum numquam.',
        location: 'officia'
      }
    ]
  },
  organization: {
    organizationName: {
      lang: 'recusandae',
      text: 'Vitae inventore qui. Impedit commodi ex illum sint et nihil est. Sint sed et quos soluta repudiandae. In molestiae vel ut possimus excepturi. Dignissimos dicta rerum hic nihil odit omnis. Sit totam natus et sed soluta tenetur est est.'
    },
    organizationDisplayName: {
      lang: 'Iure veniam neque nihil omnis omnis.\nId temporibus aut repellendus et voluptatem saepe ut omnis.\nSit officiis voluptatem totam ut.',
      text: 'Quo excepturi nihil sit quasi molestiae laborum iste cumque.'
    },
    organizationURL: {
      lang: 'sunt',
      text: 'Temporibus vitae quos eum voluptatum cupiditate aliquam harum.'
    }
  }
}
