/** Committee role/company come from teamMember.teamByRoleMemberEntry; legacy inline objects still supported. */
export const groqTeamSectionByRoleBlock = `
    _type == "teamSectionByRole" => {
        sectionTitle,
        description,
        teamByRole[] {
            role,
            members[] {
                _type == "reference" => @->{
                    "committeeRole": teamByRoleMemberEntry.role,
                    "committeeCompany": teamByRoleMemberEntry.company,
                    name,
                    title,
                    companyName,
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
                    photo {
                        asset-> {
                            url
                        }
                    }
                },
                _type == "teamByRoleMemberEntry" => {
                    "committeeRole": role,
                    "committeeCompany": company,
                    "name": member->name,
                    "title": member->title,
                    "companyName": member->companyName,
                    "button": member->button {
                        label,
                        btnType,
                        link,
                        upload {
                            asset-> {
                                url
                            }
                        }
                    },
                    "photo": member->photo {
                        asset-> {
                            url
                        }
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
`;

