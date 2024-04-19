import React from "react";

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      width="95"
      height="95"
      viewBox="0 0 95 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="47.4238" cy="47" r="47" fill="#63D056" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47.3448 78.8654C66.511 82.4541 84.4313 68.1791 87.2369 53.3224C89.5641 40.8078 78.1305 31.0202 60.6526 27.7384C39.9004 23.8615 19.8112 30.8775 17.2007 44.6607C14.632 58.5044 29.8668 75.5835 47.3448 78.8654ZM67.5151 61.4883C71.2494 62.4889 75.4354 58.9755 76.8648 53.6408C78.2942 48.3061 76.4258 43.1704 72.6915 42.1698C68.9573 41.1692 64.7713 44.6827 63.3419 50.0173C61.9124 55.352 63.7809 60.4877 67.5151 61.4883ZM70.8451 50.9925C72.7122 51.4928 74.6314 50.3848 75.1317 48.5177C75.632 46.6505 74.524 44.7314 72.6568 44.2311C70.7897 43.7308 68.8705 44.8388 68.3702 46.7059C67.8699 48.5731 68.978 50.4923 70.8451 50.9925ZM57.4542 50.1715C56.3819 56.569 52.1067 61.1844 47.9053 60.4802C43.7039 59.7759 41.1674 54.0188 42.2397 47.6213C43.312 41.2237 47.5872 36.6083 51.7886 37.3126C55.99 38.0168 58.5266 43.7739 57.4542 50.1715ZM52.5965 39.8912C54.7304 40.463 55.9967 42.6563 55.425 44.7902C54.8532 46.9241 52.6599 48.1904 50.526 47.6186C48.3921 47.0468 47.1258 44.8535 47.6976 42.7196C48.2693 40.5858 50.4627 39.3194 52.5965 39.8912Z"
        fill="white"
      />
    </svg>
  ),
};