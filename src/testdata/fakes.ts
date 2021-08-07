import * as fs from 'fs'
import { IMetadata } from '../get-saml-metadata/src/entities/IMetadataTypes'
import { makeXmlMetadata } from '../get-saml-metadata/src/interface-adapters/data/factories/makeXmlMetadata'

export const validFilePath = process.cwd() + '/src/testdata/shibIdpMetadata.xml'
export const validMetadataString = fs.readFileSync(validFilePath).toString()
export const parsedMetadataString = {
  EntityDescriptor: {
    IDPSSODescriptor: {
      Extensions: {
        'shibmd:Scope': 'pocidp.techno24x7.com'
      },
      KeyDescriptor: [
        {
          'ds:KeyInfo': {
            'ds:X509Data': {
              'ds:X509Certificate':
                'MIIDjTCCAnUCFEfrDgg5EbuYxdqMKep1Dy6l9tfmMA0GCSqGSIb3DQEBCwUAMIGC\nMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1AxEjAQBgNVBAcMCVNhbyBQYXVsbzET\nMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UEAwwVcG9jaWRwLnRlY2hubzI0eDcu\nY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0BnbHV1Lm9yZzAeFw0yMTA2MjQxNzMx\nMDJaFw0yMjA2MjQxNzMxMDJaMIGCMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1Ax\nEjAQBgNVBAcMCVNhbyBQYXVsbzETMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UE\nAwwVcG9jaWRwLnRlY2hubzI0eDcuY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0Bn\nbHV1Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALGNOi4d5sbO\nIaqmJY7VLuLODs2bO1VvGN8AydqVL1TR2ibB1ZmkTZCBQAulh3iiW+NwHYpPVzoO\nkEmCH7qT+BvqQ0LuAWwb88+a7G4t69PwVkO1oE8sxApuQ0qh7TQ0eRhn1jhROff1\nM+SOvDYeJXezMLPyDSlgzzt9oEymb3spoV7LlyPfDXhfGIrGDWsrGFTAMC5wAlyM\nji3Cv+rjSNdJSFQQ07mYIGAiV9jmIDwe47amTvmMQZTXCOQlgJnjivalUfRkZnhY\nnBeS4tkkuQu/ZQqM5EOaX4hyZkYMImjpWq1Era4UmMht1y+zPLwIyGjoBMRvG/Iz\nnx6PWMQeTacCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAGuxFRGUxlOJ1EdgJSidl\nDbGY/LpuGoeQHmBk3gFhug8FMKjeY2MU+RfpCzxoR1sF2wsshagcSMYs7D6ApWFc\ng+RqpTJ6B3CP5rANx2+MwXDs8lEf0yrswlDmCVXTK8g5CwYtARqHPM9kv0gFUkSf\nSobRvkTRGPzYwhvmPNpTWKtZtPF/rNam8Y3l56jEeMFJjLLtz/3Q7/ofH94rsDFF\ngslzQrk0ETEftKsgV1g0s9/icPzgH9cYK+J2E/ADoC0j2XCk8TegMglUvJ34DsJU\nrL/sYIs/Z7A5nnrVMiTx7wAGDl1w6so7rK+h/TkIrORwOyXWyO1LIHD5+yMkv1AR\new=='
            }
          }
        },
        {
          'ds:KeyInfo': {
            'ds:X509Data': {
              'ds:X509Certificate':
                'MIIDjTCCAnUCFFlJu9jZPHz8Es2mM8IMHlfc2jPDMA0GCSqGSIb3DQEBCwUAMIGC\nMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1AxEjAQBgNVBAcMCVNhbyBQYXVsbzET\nMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UEAwwVcG9jaWRwLnRlY2hubzI0eDcu\nY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0BnbHV1Lm9yZzAeFw0yMTA2MjQxNzMx\nMDFaFw0yMjA2MjQxNzMxMDFaMIGCMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1Ax\nEjAQBgNVBAcMCVNhbyBQYXVsbzETMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UE\nAwwVcG9jaWRwLnRlY2hubzI0eDcuY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0Bn\nbHV1Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANvT+2lBREr2\nYObeZuVhn1iJpytbFnMMu1xxtS5bSNdsZI+ogCqpzWz2U7+6is6Wlyj9ZM7KFUiR\nsXUssrR8EAqHCJ6FMFLfyKVPeYKEVfjzfZgBeeuSau46znIoQsxY3qZX5qSh/dMX\n9tFi+kCXx6coO+umCorIZTFF1EH7t1F2mNRiJXmEwdozCCGPmf0hZgZ6a5i1Lgsu\nR6+FmRQmgJLOJLlLXcXbI2dHtLBQtxtinMyRhy/u4Thk7QasvF5zxkHeiJKWm98p\nziXgaBFD70YO7TukKzkY6eNyIsCqN/irlrvHrqxxVB5heis+DLRJ9++O1rn6TEPo\nSiAyi7u1S78CAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAx+ul0nfxf9hDO/6sS8Mm\nUbd002Dhm6gPWXOG2AEQrhdkL3gaWQZ+ffxMBmZ74FodsuKoxpsRUIkZ0olBDX+s\n8xYHSRq8LgQxiCxSEsa6km7WinHJD7iry1uzLpNPCsU+PPH3/s/AOKExghNccu/f\nTcqr514b9vDWMtSSQzc2eD8znhrRHiQKTLwGDbUM5AvXsEn3ZQvn3ctLOgkdtxiT\nQicgAVv6iBezmIjm6Zple7S5sRwSdR5MjhsAdbLlQ9en9l69PojsnTb9/iHSmhMy\nm4QKxaItsPONkG1AgwjkIpzWmPtO5kFsmdyeHq6Fgc/GYqVg6HF9R9UCav1pdJQO\nkA=='
            }
          }
        }
      ],
      ArtifactResolutionService: '',
      SingleLogoutService: ['', '', '', ''],
      NameIDFormat: [
        'urn:mace:shibboleth:1.0:nameIdentifier',
        'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
        'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent'
      ],
      SingleSignOnService: ['', '', '', '']
    },
    AttributeAuthorityDescriptor: {
      Extensions: {
        'shibmd:Scope': 'pocidp.techno24x7.com'
      },
      KeyDescriptor: [
        {
          'ds:KeyInfo': {
            'ds:X509Data': {
              'ds:X509Certificate':
                'MIIDjTCCAnUCFEfrDgg5EbuYxdqMKep1Dy6l9tfmMA0GCSqGSIb3DQEBCwUAMIGC\nMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1AxEjAQBgNVBAcMCVNhbyBQYXVsbzET\nMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UEAwwVcG9jaWRwLnRlY2hubzI0eDcu\nY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0BnbHV1Lm9yZzAeFw0yMTA2MjQxNzMx\nMDJaFw0yMjA2MjQxNzMxMDJaMIGCMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1Ax\nEjAQBgNVBAcMCVNhbyBQYXVsbzETMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UE\nAwwVcG9jaWRwLnRlY2hubzI0eDcuY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0Bn\nbHV1Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALGNOi4d5sbO\nIaqmJY7VLuLODs2bO1VvGN8AydqVL1TR2ibB1ZmkTZCBQAulh3iiW+NwHYpPVzoO\nkEmCH7qT+BvqQ0LuAWwb88+a7G4t69PwVkO1oE8sxApuQ0qh7TQ0eRhn1jhROff1\nM+SOvDYeJXezMLPyDSlgzzt9oEymb3spoV7LlyPfDXhfGIrGDWsrGFTAMC5wAlyM\nji3Cv+rjSNdJSFQQ07mYIGAiV9jmIDwe47amTvmMQZTXCOQlgJnjivalUfRkZnhY\nnBeS4tkkuQu/ZQqM5EOaX4hyZkYMImjpWq1Era4UmMht1y+zPLwIyGjoBMRvG/Iz\nnx6PWMQeTacCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAGuxFRGUxlOJ1EdgJSidl\nDbGY/LpuGoeQHmBk3gFhug8FMKjeY2MU+RfpCzxoR1sF2wsshagcSMYs7D6ApWFc\ng+RqpTJ6B3CP5rANx2+MwXDs8lEf0yrswlDmCVXTK8g5CwYtARqHPM9kv0gFUkSf\nSobRvkTRGPzYwhvmPNpTWKtZtPF/rNam8Y3l56jEeMFJjLLtz/3Q7/ofH94rsDFF\ngslzQrk0ETEftKsgV1g0s9/icPzgH9cYK+J2E/ADoC0j2XCk8TegMglUvJ34DsJU\nrL/sYIs/Z7A5nnrVMiTx7wAGDl1w6so7rK+h/TkIrORwOyXWyO1LIHD5+yMkv1AR\new=='
            }
          }
        },
        {
          'ds:KeyInfo': {
            'ds:X509Data': {
              'ds:X509Certificate':
                'MIIDjTCCAnUCFFlJu9jZPHz8Es2mM8IMHlfc2jPDMA0GCSqGSIb3DQEBCwUAMIGC\nMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1AxEjAQBgNVBAcMCVNhbyBQYXVsbzET\nMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UEAwwVcG9jaWRwLnRlY2hubzI0eDcu\nY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0BnbHV1Lm9yZzAeFw0yMTA2MjQxNzMx\nMDFaFw0yMjA2MjQxNzMxMDFaMIGCMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1Ax\nEjAQBgNVBAcMCVNhbyBQYXVsbzETMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UE\nAwwVcG9jaWRwLnRlY2hubzI0eDcuY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0Bn\nbHV1Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANvT+2lBREr2\nYObeZuVhn1iJpytbFnMMu1xxtS5bSNdsZI+ogCqpzWz2U7+6is6Wlyj9ZM7KFUiR\nsXUssrR8EAqHCJ6FMFLfyKVPeYKEVfjzfZgBeeuSau46znIoQsxY3qZX5qSh/dMX\n9tFi+kCXx6coO+umCorIZTFF1EH7t1F2mNRiJXmEwdozCCGPmf0hZgZ6a5i1Lgsu\nR6+FmRQmgJLOJLlLXcXbI2dHtLBQtxtinMyRhy/u4Thk7QasvF5zxkHeiJKWm98p\nziXgaBFD70YO7TukKzkY6eNyIsCqN/irlrvHrqxxVB5heis+DLRJ9++O1rn6TEPo\nSiAyi7u1S78CAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAx+ul0nfxf9hDO/6sS8Mm\nUbd002Dhm6gPWXOG2AEQrhdkL3gaWQZ+ffxMBmZ74FodsuKoxpsRUIkZ0olBDX+s\n8xYHSRq8LgQxiCxSEsa6km7WinHJD7iry1uzLpNPCsU+PPH3/s/AOKExghNccu/f\nTcqr514b9vDWMtSSQzc2eD8znhrRHiQKTLwGDbUM5AvXsEn3ZQvn3ctLOgkdtxiT\nQicgAVv6iBezmIjm6Zple7S5sRwSdR5MjhsAdbLlQ9en9l69PojsnTb9/iHSmhMy\nm4QKxaItsPONkG1AgwjkIpzWmPtO5kFsmdyeHq6Fgc/GYqVg6HF9R9UCav1pdJQO\nkA=='
            }
          }
        }
      ],
      AttributeService: ['', ''],
      NameIDFormat: [
        'urn:mace:shibboleth:1.0:nameIdentifier',
        'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
        'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent'
      ]
    },
    Organization: {
      OrganizationName: 'SingleMeta',
      OrganizationDisplayName: 'SingleMeta',
      OrganizationURL: 'https://pocidp.techno24x7.com'
    }
  }
}

export const validXmlMetadata = makeXmlMetadata({ xml: validMetadataString })

export const fakeMetadata: IMetadata = {
  entityID:
    'Nihil rerum maxime. Qui amet sed error. Earum iste consequatur sapiente. Occaecati reiciendis et.',
  idpssoDescriptor: {
    errorURL:
      'Explicabo enim corrupti quae iusto corporis dolor itaque inventore maiores.',
    protocolSupportEnumeration:
      'Ipsam sit libero excepturi earum molestiae aliquam nam.',
    keyDescriptor: [
      {
        use: 'signing',
        keyInfo: {
          x509Data: {
            x509Certificate:
              'Voluptatum unde sunt iure. Dolores enim dolor impedit velit illo repellendus. Aspernatur dolorum est dolor quo eaque id qui. Quibusdam eveniet sit maiores nihil impedit accusantium beatae dolorem dignissimos. Soluta sint id enim voluptas repellat saepe ipsam. Quasi reiciendis quia.'
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
            x509Certificate:
              'Debitis et qui minus eos temporibus ab dolore iure veniam.'
          }
        }
      },
      {
        use: 'Quo rerum nihil et alias ex quidem ab hic laudantium. Totam ut autem perferendis accusantium ex consequuntur. Consequatur id aut aut et voluptatibus voluptas facilis quis. Repellendus id id dolorem consequatur laboriosam. Tenetur qui voluptatem non ex dolores et praesentium et.\n \rVel voluptatibus quae sit non voluptate est labore. Eaque harum ut laudantium facilis amet voluptate non. Qui rem blanditiis eius.\n \rMaxime doloremque molestiae recusandae fugit fugiat voluptas. Ut ut debitis ut est sed atque est ad hic. Earum omnis illum mollitia eaque dignissimos hic id fuga magni. Dolor consequatur incidunt mollitia dolores dolorem tenetur facilis. Et corrupti ut pariatur mollitia delectus molestiae blanditiis et. Fugiat nihil sed quam atque qui pariatur in corporis molestias.',
        keyInfo: {
          x509Data: {
            x509Certificate:
              'Pariatur dolorem soluta commodi et expedita error nihil voluptatum ut. Dolorum incidunt molestiae cupiditate.'
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
        location:
          'Soluta eos laboriosam aliquid recusandae et.\nOdio et ab quibusdam mollitia vel consequuntur voluptatibus quaerat.\nOmnis quia aut tempora.\nSed itaque consequatur deleniti ipsum id.'
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
        binding:
          'Earum ut quasi suscipit fuga exercitationem natus cum. Doloremque voluptas quisquam.',
        location:
          'Vitae quasi velit exercitationem maxime quo eveniet. Odio quia sit omnis sequi similique ratione nihil aliquid enim. Optio sunt molestiae totam. Ea modi repudiandae. Hic suscipit quod cupiditate et. Qui voluptatem quia voluptates consequuntur facilis.'
      },
      {
        binding: 'Itaque autem est pariatur.\nMollitia quia ut quia.',
        location:
          'Exercitationem rerum sunt dolorem sit rerum reprehenderit. Id praesentium commodi. Hic repudiandae labore qui. In vero sit earum quae illo. Dolore deserunt quod dicta dolore doloremque porro atque.'
      },
      {
        binding:
          'Illum libero qui consequatur. Consequatur qui suscipit ratione ab debitis quasi ex minima. Aut sequi itaque necessitatibus aut architecto veritatis. Deserunt nihil in voluptate blanditiis reprehenderit consectetur non quo et.',
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
        location:
          'Illum consequatur ut.\nAlias nihil deleniti corrupti eveniet cumque repellendus eaque voluptas.\nSaepe neque quos explicabo optio ea earum eveniet quia.\nEt aperiam sed hic dolores repellendus rerum sed adipisci et.\nSit illo molestias occaecati aperiam omnis consequatur.'
      },
      {
        binding:
          'Quia exercitationem ut et vel dignissimos dicta. Numquam suscipit doloribus nostrum voluptas. Porro et totam sequi veritatis ipsam similique odio. Consectetur culpa dolorem sequi dolorum eos dolor ratione quo. Quos et dolores et facilis consequuntur nemo saepe quisquam aspernatur.\n \rVero vel explicabo veniam quod cupiditate sed dolorum. Adipisci dicta tempore molestiae autem praesentium deserunt deleniti. Facere consequatur quidem fuga a mollitia. Optio fugiat et aliquid. Earum neque enim adipisci.\n \rAut officia perferendis eos ipsum omnis nobis harum quaerat. Amet facere quia incidunt. Assumenda velit neque.',
        location:
          'Atque neque est facilis aut ex distinctio error aspernatur. Et voluptatem porro officia at tempora. Aperiam consectetur enim est. Amet sit accusantium error facere. Esse tempore voluptatem. Fuga dicta sunt omnis ea.'
      },
      {
        binding:
          'Et nisi cum magnam sunt et similique commodi. Commodi accusantium natus pariatur ipsa et labore. Commodi id perspiciatis dolorum cum laboriosam in earum. Harum ad earum. Qui quidem repellat tempora et rerum numquam.',
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

export const parsedByToolIdpSSODescriptor = {
  '@_errorURL': 'https://pocidp.techno24x7.com/identity/feedback.htm',
  '@_protocolSupportEnumeration': 'urn:oasis:names:tc:SAML:2.0:protocol',
  Extensions: {
    'shibmd:Scope': {
      '#text': 'pocidp.techno24x7.com',
      '@_regexp': 'false'
    }
  },
  KeyDescriptor: [
    {
      '@_use': 'signing',
      'ds:KeyInfo': {
        'ds:X509Data': {
          'ds:X509Certificate':
            'MIIDjTCCAnUCFEfrDgg5EbuYxdqMKep1Dy6l9tfmMA0GCSqGSIb3DQEBCwUAMIGC\nMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1AxEjAQBgNVBAcMCVNhbyBQYXVsbzET\nMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UEAwwVcG9jaWRwLnRlY2hubzI0eDcu\nY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0BnbHV1Lm9yZzAeFw0yMTA2MjQxNzMx\nMDJaFw0yMjA2MjQxNzMxMDJaMIGCMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1Ax\nEjAQBgNVBAcMCVNhbyBQYXVsbzETMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UE\nAwwVcG9jaWRwLnRlY2hubzI0eDcuY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0Bn\nbHV1Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALGNOi4d5sbO\nIaqmJY7VLuLODs2bO1VvGN8AydqVL1TR2ibB1ZmkTZCBQAulh3iiW+NwHYpPVzoO\nkEmCH7qT+BvqQ0LuAWwb88+a7G4t69PwVkO1oE8sxApuQ0qh7TQ0eRhn1jhROff1\nM+SOvDYeJXezMLPyDSlgzzt9oEymb3spoV7LlyPfDXhfGIrGDWsrGFTAMC5wAlyM\nji3Cv+rjSNdJSFQQ07mYIGAiV9jmIDwe47amTvmMQZTXCOQlgJnjivalUfRkZnhY\nnBeS4tkkuQu/ZQqM5EOaX4hyZkYMImjpWq1Era4UmMht1y+zPLwIyGjoBMRvG/Iz\nnx6PWMQeTacCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAGuxFRGUxlOJ1EdgJSidl\nDbGY/LpuGoeQHmBk3gFhug8FMKjeY2MU+RfpCzxoR1sF2wsshagcSMYs7D6ApWFc\ng+RqpTJ6B3CP5rANx2+MwXDs8lEf0yrswlDmCVXTK8g5CwYtARqHPM9kv0gFUkSf\nSobRvkTRGPzYwhvmPNpTWKtZtPF/rNam8Y3l56jEeMFJjLLtz/3Q7/ofH94rsDFF\ngslzQrk0ETEftKsgV1g0s9/icPzgH9cYK+J2E/ADoC0j2XCk8TegMglUvJ34DsJU\nrL/sYIs/Z7A5nnrVMiTx7wAGDl1w6so7rK+h/TkIrORwOyXWyO1LIHD5+yMkv1AR\new=='
        }
      }
    },
    {
      '@_use': 'encryption',
      'ds:KeyInfo': {
        'ds:X509Data': {
          'ds:X509Certificate':
            'MIIDjTCCAnUCFFlJu9jZPHz8Es2mM8IMHlfc2jPDMA0GCSqGSIb3DQEBCwUAMIGC\nMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1AxEjAQBgNVBAcMCVNhbyBQYXVsbzET\nMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UEAwwVcG9jaWRwLnRlY2hubzI0eDcu\nY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0BnbHV1Lm9yZzAeFw0yMTA2MjQxNzMx\nMDFaFw0yMjA2MjQxNzMxMDFaMIGCMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1Ax\nEjAQBgNVBAcMCVNhbyBQYXVsbzETMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UE\nAwwVcG9jaWRwLnRlY2hubzI0eDcuY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0Bn\nbHV1Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANvT+2lBREr2\nYObeZuVhn1iJpytbFnMMu1xxtS5bSNdsZI+ogCqpzWz2U7+6is6Wlyj9ZM7KFUiR\nsXUssrR8EAqHCJ6FMFLfyKVPeYKEVfjzfZgBeeuSau46znIoQsxY3qZX5qSh/dMX\n9tFi+kCXx6coO+umCorIZTFF1EH7t1F2mNRiJXmEwdozCCGPmf0hZgZ6a5i1Lgsu\nR6+FmRQmgJLOJLlLXcXbI2dHtLBQtxtinMyRhy/u4Thk7QasvF5zxkHeiJKWm98p\nziXgaBFD70YO7TukKzkY6eNyIsCqN/irlrvHrqxxVB5heis+DLRJ9++O1rn6TEPo\nSiAyi7u1S78CAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAx+ul0nfxf9hDO/6sS8Mm\nUbd002Dhm6gPWXOG2AEQrhdkL3gaWQZ+ffxMBmZ74FodsuKoxpsRUIkZ0olBDX+s\n8xYHSRq8LgQxiCxSEsa6km7WinHJD7iry1uzLpNPCsU+PPH3/s/AOKExghNccu/f\nTcqr514b9vDWMtSSQzc2eD8znhrRHiQKTLwGDbUM5AvXsEn3ZQvn3ctLOgkdtxiT\nQicgAVv6iBezmIjm6Zple7S5sRwSdR5MjhsAdbLlQ9en9l69PojsnTb9/iHSmhMy\nm4QKxaItsPONkG1AgwjkIpzWmPtO5kFsmdyeHq6Fgc/GYqVg6HF9R9UCav1pdJQO\nkA=='
        }
      }
    }
  ],
  ArtifactResolutionService: {
    '@_Binding': 'urn:oasis:names:tc:SAML:2.0:bindings:SOAP',
    '@_Location':
      'https://pocidp.techno24x7.com/idp/profile/SAML2/SOAP/ArtifactResolution',
    '@_index': '1'
  },
  SingleLogoutService: [
    {
      '@_Binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
      '@_Location':
        'https://pocidp.techno24x7.com/idp/profile/SAML2/Redirect/SLO'
    },
    {
      '@_Binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
      '@_Location': 'https://pocidp.techno24x7.com/idp/profile/SAML2/POST/SLO'
    },
    {
      '@_Binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign',
      '@_Location':
        'https://pocidp.techno24x7.com/idp/profile/SAML2/POST-SimpleSign/SLO'
    },
    {
      '@_Binding': 'urn:oasis:names:tc:SAML:2.0:bindings:SOAP',
      '@_Location': 'https://pocidp.techno24x7.com/idp/profile/SAML2/SOAP/SLO'
    }
  ],
  NameIDFormat: [
    'urn:mace:shibboleth:1.0:nameIdentifier',
    'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
    'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent'
  ],
  SingleSignOnService: [
    {
      '@_Binding': 'urn:mace:shibboleth:2.0:profiles:AuthnRequest',
      '@_Location':
        'https://pocidp.techno24x7.com/idp/profile/SAML2/Unsolicited/SSO'
    },
    {
      '@_Binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
      '@_Location': 'https://pocidp.techno24x7.com/idp/profile/SAML2/POST/SSO'
    },
    {
      '@_Binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign',
      '@_Location':
        'https://pocidp.techno24x7.com/idp/profile/SAML2/POST-SimpleSign/SSO'
    },
    {
      '@_Binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
      '@_Location':
        'https://pocidp.techno24x7.com/idp/profile/SAML2/Redirect/SSO'
    }
  ]
}
