import { groqTeamSectionByRoleBlock } from "@/lib/queries/teamSectionByRoleGroq";

/**
 * GROQ projection for `pageBuilderSections[]` (same shape as `page` documents).
 * Use inside a parent query, e.g. `*[_type == "homePage"][0]{ ..., ${PAGE_BUILDER_SECTIONS_GROQ} }`
 */
export const PAGE_BUILDER_SECTIONS_GROQ = `
  pageBuilderSections[]{
    _type,
    _key,
    _type == "featuresSection" => {
        sectionTitle,
        description,
        items[] {
            title,
            description,
        },
        columns,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    _type == "contentSection" => {
        heading,
        body,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
        button2 {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
        button3 {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    _type == "imageContent" => {
        heading,
        body,
        image {
            asset-> {
                url,
                metadata {
                    dimensions {
                        width,
                        height
                    }
                }
            }
        },
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
        button2 {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
        button3 {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    _type == "videoSection" => {
        heading,
        body,
        videoFile {
            asset-> {
                url
            }
        }
    },
    _type == "splitImagesSection" => {
        heading,
        leftImage {
            asset-> {
                url
            }
        },
        rightImage {
            asset-> {
                url
            }
        },
        leftCaption,
        rightCaption
    },
    _type == "awardSection" => {
        heading,
        awards[] {
            name,
            awardTitle,
            company,
            image {
                asset-> {
                    url,
                    metadata {
                        dimensions {
                            width,
                            height
                        }
                    }
                }
            }
        }
    },
    _type == "resourceLinksSection" => {
        body,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
        resourceGroups[] {
            title,
            links[] {
                label,
                url,
            }
        }
    },
    _type == "splitContentSection" => {
        heading,
        body,
        details,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    ${groqTeamSectionByRoleBlock}
    _type == "servicesSection" => {
        sectionTitle,
        description,
        items[] {
            image {
                asset-> {
                    url
                }
            },
            title,
            button {
                label,
                btnType,
                link,
                upload {
                    asset-> {
                        url
                    }
                }
            }
        },
        columns,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    _type == "newsSection" => {
        heading,
        items[]-> {
            _type,
            _key,
            _type == "newsArticle" => {
                title,
                slug,
                excerpt,
                publishedAt,
                featuredImage {
                    asset-> {
                        url
                    }
                }
            },
            _type == "newsMediaPolicies" => {
                title,
                slug,
                excerpt,
            }
        }
    },
    _type == "formSection" => {
        sectionTitle,
        description,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
        formTitle,
        formSubtitle,
        formSubmitLabel,
        formId,
    },
    _type == "committeesSection" => {
        sectionTitle,
        description,
        committees[] -> {
            _key,
            title,
            slug,
            thumbnailImage {
                asset-> {
                    url
                }
            }
        },
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    _type == "tabsSection" => {
        heading,
        "intro": intro[]{
            ...,
            _type == "image" => {
                ...,
                asset->{
                    _id,
                    metadata {
                        dimensions {
                            width,
                            height
                        }
                    }
                }
            },
            _type == "button" => {
                label,
                btnType,
                link,
                upload {
                    asset-> {
                        url
                    }
                }
            }
        },
        tabs[] {
            title,
            "content": content[]{
                ...,
                _type == "image" => {
                    ...,
                    asset->{
                        _id,
                        metadata {
                            dimensions {
                                width,
                                height
                            }
                        }
                    }
                },
                _type == "button" => {
                    label,
                    btnType,
                    link,
                    upload {
                        asset-> {
                            url
                        }
                    }
                }
            },
            image {
                asset-> {
                    url
                }
            },
            entries[] {
                "content": content[]{
                    ...,
                    _type == "image" => {
                        ...,
                        asset->{
                            _id,
                            metadata {
                                dimensions {
                                    width,
                                    height
                                }
                            }
                        }
                    },
                    _type == "button" => {
                        label,
                        btnType,
                        link,
                        upload {
                            asset-> {
                                url
                            }
                        }
                    }
                },
                link,
                logo {
                    asset-> {
                        url
                    }
                }
            }
        }
    },
    _type == "tabsTestimonialSection" => {
        heading,
        "intro": intro[]{
            ...,
            _type == "image" => {
                ...,
                asset->{
                    _id,
                    metadata {
                        dimensions {
                            width,
                            height
                        }
                    }
                }
            },
            _type == "button" => {
                label,
                btnType,
                link,
                upload {
                    asset-> {
                        url
                    }
                }
            }
        },
        tabs[] {
            title,
            testimonials[]-> {
                _id,
                name,
                designation,
                link,
                companyLogo {
                    asset-> {
                        url,
                        metadata {
                            dimensions {
                                width,
                                height
                            }
                        }
                    }
                },
                quote
            }
        }
    },
    _type == "ctaBand" => {
        headline,
        subtext,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
        button2 {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    _type == "carouselSection" => {
      heading,
      intro,
      slides[] {
        alt,
        caption,
        "imageUrl": image.asset->url,
        image,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    },
    _type == "testimonialsSection" => {
      heading,
      "intro": intro[]{
        ...,
        _type == "image" => {
          ...,
          asset->{
            _id,
            metadata {
              dimensions {
                width,
                height
              }
            }
          }
        },
        _type == "button" => {
          label,
          btnType,
          link,
          upload {
            asset-> {
              url
            }
          }
        }
      },
      testimonials[]->{
        _id,
        name,
        designation,
        companyLogo {
          asset-> {
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          }
        },
        quote
      }
    },
    _type == "photoGalleriesSection" => {
      heading,
      "intro": intro[]{
        ...,
        _type == "image" => {
          ...,
          asset->{
            _id,
            metadata {
              dimensions {
                width,
                height
              }
            }
          }
        },
        _type == "button" => {
          label,
          btnType,
          link,
          upload {
            asset-> {
              url
            }
          }
        }
      },
      galleries[]{
        title,
        url,
        coverImage {
          asset-> {
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          }
        }
      }
    },
    _type == "embedPanelsSection" => {
      heading,
      "intro": intro[]{
        ...,
        _type == "image" => {
          ...,
          asset->{
            _id,
            metadata {
              dimensions {
                width,
                height
              }
            }
          }
        },
        _type == "button" => {
          label,
          btnType,
          link,
          upload {
            asset-> {
              url
            }
          }
        }
      },
      panels[]{
        label,
        embedUrl
      }
    },
    _type == "sponsorLogosSection" => {
      sectionTitle,
      description,
      columns,
      logos[]{
        alt,
        url,
        openInNewTab,
        logo{
          ...,
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          }
        }
      },
      button {
        label,
        btnType,
        link,
        upload {
          asset-> {
            url
          }
        }
      }
    },
    _type == "faqSection" => {
      enabled,
      heading,
      items[]-> {
        question,
        answer
      }
    }
  }
`;
