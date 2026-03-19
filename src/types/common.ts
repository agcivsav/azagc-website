import { PortableTextBlock } from "sanity";

export interface IImage {
    asset?: {
        url?: string;
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
            title: string;
            company: string;
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

export interface INewsSection {
    _type: string;
    _key?: string;
    heading: string;
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
        content: PortableTextBlock[];
        image?: IImage;
    }[];
}

export interface ICTABand {
    _type: string;
    _key?: string;
    heading: string;
    subtext: string;
    button?: IButton;
    button2?: IButton;
}

export type ISection = IFeaturesSection | ISimpleContent | IImageContent | IVideoSection | ISplitImagesSection | IAwardSection | IResourceLinksSection | ISplitContentSection | ITeamSectionByRole | IServicesSection | INewsSection | IFormSection | ICommitteesSection | ITabsSection | ICTABand;

export interface IPage {
    seo?: ISEO;
    title: string;
    slug: string;
    hero?: IPageHero;
    pageBuilderSections: ISection[];
}