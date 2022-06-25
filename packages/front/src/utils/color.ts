import { colors } from 'utils/theme';

// 引数がカラーコードではなかった場合、Grayを返す
export const validateColorCode = (colorCode: string): string => {
  if (/^#[0-9A-Fa-f]{6}$/.test(colorCode)) {
    return colorCode;
  } else {
    return colors.gray[400];
  }
};
