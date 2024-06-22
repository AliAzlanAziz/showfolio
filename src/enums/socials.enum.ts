export enum Socials {
    GITHUB = 'github',
    LINKEDIN = 'linkedin',
    DRIBBBLE = 'dribbble',
    WEBSITE = 'website',
    STACKOVERFLOW = 'stackoverflow'
}

export const isGithub = (social: Socials): boolean => {
    return social === Socials.GITHUB
}