/** Color tokens — source of truth: design-tokens/colors.json + figma/naming_rules.md */

export const colors = {
  text: {
    primary: 'rgb(46, 51, 69)',
    secondary: 'rgb(97, 111, 158)',
    disabled: 'rgb(213, 214, 218)',
    disabledSecondary: 'rgb(223, 226, 236)',
    onPrimary: 'rgb(255, 255, 255)',
    muted: 'rgb(144, 154, 187)',
  },
  bg: {
    surface: 'rgb(255, 255, 255)',
    page: 'rgb(239, 241, 248)',
    input: 'rgb(244, 246, 250)',
    elevated: 'rgb(248, 250, 252)',
  },
  primary: {
    default: 'rgb(76, 135, 236)',
    hover: 'rgb(39, 101, 207)',
    muted: 'rgb(219, 231, 251)',
    mutedStrong: 'rgb(148, 183, 244)',
    activeRow: 'rgb(238, 243, 254)',
  },
  status: {
    error: 'rgb(235, 87, 87)',
    errorBg: 'rgb(253, 239, 239)',
    errorBgStrong: 'rgb(251, 221, 221)',
    success: 'rgb(39, 174, 96)',
    successBg: 'rgb(234, 247, 240)',
    warning: 'rgb(255, 178, 43)',
    warningBg: 'rgb(255, 248, 234)',
  },
  stroke: {
    subtle: 'rgb(233, 237, 244)',
    default: 'rgb(212, 215, 219)',
  },
} as const;
