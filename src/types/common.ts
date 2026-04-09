import { PortableTextBlock } from "sanity";

export interface IImage {
    asset?: {
        url?: string;
        metadata?: {
            dimensions?: {
                width?: number;
                height?: number;
            };
        };
    };
}

export interface IButton {
    label: string;
    btnType: 'internal' | 'external' | 'upload' | 'none';
    link: string;
    upload?: IImage
}

export interface ISEO {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: IImage;
    noIndex?: boolean;
}

export interface IPageHero {
    title: string;
    subtitle?: string;
    backgroundImage?: IImage;
}

export interface IFeaturesSection {
    _type: string;
    _key?: string;
    sectionTitle: string;
    description?: PortableTextBlock[];
    items: {
        title: string;
        description: string;
    }[];
    columns: '3' | '4';
    button?: IButton;
}

export interface ISimpleContent {
    _type: string;
    _key?: string;
    heading: string;
    body?: PortableTextBlock[];
    button?: IButton;
    button2?: IButton;
    button3?: IButton;
}

export interface IImageContent {
    _type: string;
    _key?: string;
    heading: string;
    body?: PortableTextBlock[];
    image?: IImage;
    button?: IButton;
    button2?: IButton;
    button3?: IButton;
}

export interface IVideoSection {
    _type: string;
    _key?: string;
    heading: string;
    body?: PortableTextBlock[];
    videoFile?: IImage;
}

export interface ISplitImagesSection {
    _type: string;
    _key?: string;
    heading: string;
    leftImage?: IImage;
    leftCaption?: string;
    rightImage?: IImage;
    rightCaption?: string;
}

export interface IAwardSection {
    _type: string;
    _key?: string;
    heading: string;
    awards: {
        name: string;
        awardTitle: string;
        company: string;
        image?: IImage;
    }[];
}

export interface IResourceLinksSection {
    _type: string;
    _key?: string;
    body?: PortableTextBlock[];
    button?: IButton;
    resourceGroups: {
        title: string;
        links: {
            label: string;
            url: string;
        }[];
    }[];
}

export interface ISplitContentSection {
    _type: string;
    _key?: string;
    heading: string;
    body?: PortableTextBlock[];
    button?: IButton;
    details?: PortableTextBlock[];
}

export interface ITeamSectionByRole {
    _type: string;
    _key?: string;
    sectionTitle: string;
    description?: PortableTextBlock[];
    button?: IButton;
    teamByRole: {
        role: string;
        members: {
            name: string;
            title?: string;
            company?: string;
            companyName?: string;
            committeeRole?: string | null;
            committeeCompany?: string | null;
            button?: IButton;
            photo?: IImage;
        }[];
    }[];
    columns: '3' | '4';
}

export interface IServicesSection {
    _type: string;
    _key?: string;
    sectionTitle: string;
    description?: PortableTextBlock[];
    items: {
        title: string;
        image?: IImage;
        button?: IButton;
    }[];
    columns: '3' | '4';
    button?: IButton;
}

export type NewsGridArticle = {
    title: string;
    slug: { current: string };
    excerpt: string | null;
    featuredImage?: IImage;
    _type: "newsArticle" | "newsMediaPolicies";
};


export interface INewsSection {
    _type: string;
    _key?: string;
    heading: string;
    items: NewsGridArticle[];
}

export interface IFormSection {
    _type: string;
    _key?: string;
    sectionTitle: string;
    description?: PortableTextBlock[];
    button?: IButton;
    formTitle: string;
    formSubtitle: string;
    formSubmitLabel: string;
    formId: string;
}

export interface ICommitteesSection {
    _type: string;
    _key?: string;
    sectionTitle: string;
    description?: PortableTextBlock[];
    button?: IButton;
    committees: {
        title: string;
        slug: { current: string };
        thumbnailImage?: IImage;
    }[];
}

export interface ITabsSection {
    _type: string;
    _key?: string;
    heading: string;
    intro: PortableTextBlock[];
    tabs: {
        title: string;
        content?: PortableTextBlock[];
        image?: IImage;
        entries?: {
            content?: PortableTextBlock[];
            logo?: IImage;
            link?: string;
        }[];
    }[];
}

export interface ITabsTestimonialSection {
    _type: string;
    _key?: string;
    heading: string;
    intro: PortableTextBlock[];
    tabs: {
        title: string;
        testimonials?: Array<{
            _id: string;
            name: string;
            designation?: string | null;
            quote: string;
            link?: string | null;
            companyLogo?: IImage;
        }>;
    }[];
}

export interface ICTABand {
    _type: string;
    _key?: string;
    headline: string;
    subtext: string;
    button?: IButton;
    button2?: IButton;
}

export interface ICarouselSection {
    _type: string;
    _key?: string;
    heading?: string;
    intro?: PortableTextBlock[];
    slides: {
        image?: IImage;
        alt?: string;
        caption?: string;
    }[];
}

export interface ITestimonialsSection {
    _type: string;
    _key?: string;
    heading: string;
    intro?: PortableTextBlock[];
    testimonials?: Array<{
        _id: string;
        name: string;
        designation?: string | null;
        quote: string;
        link?: string | null;
        companyLogo?: IImage;
    }>;
}

export interface IPhotoGalleriesSection {
    _type: string;
    _key?: string;
    heading: string;
    intro?: PortableTextBlock[];
    galleries: {
        title: string;
        url: string;
        coverImage?: IImage;
    }[];
}

export interface IEmbedPanelsSection {
    _type: string;
    _key?: string;
    heading: string;
    intro?: PortableTextBlock[];
    panels: {
        label: string;
        embedUrl?: string[];
    }[];
}

export interface IFAQSection {
    _type: string;
    _key?: string;
    enabled?: boolean;
    heading: string;
    items: {
        question: string;
        answer: string;
    }[];
}

export type ISection = IFeaturesSection | ISimpleContent | IImageContent | IVideoSection | ISplitImagesSection | IAwardSection | IResourceLinksSection | ISplitContentSection | ITeamSectionByRole | IServicesSection | INewsSection | IFormSection | ICommitteesSection | ITabsSection | ICTABand | ICarouselSection | ITestimonialsSection | ITabsTestimonialSection | IPhotoGalleriesSection | IEmbedPanelsSection | IFAQSection;

export interface IPage {
    seo?: ISEO;
    title: string;
    slug: string;
    hero?: IPageHero;
    pageBuilderSections: ISection[];
}