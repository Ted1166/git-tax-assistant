interface Props {
    size?: number
}

export function Logo({ size = 40 }: Props) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mile logo">
            <circle cx="32" cy="32" r="30" fill="#17331D" stroke="#2F6B3D" strokeWidth="2" />
            <path
                d="M32 12 L48 22 V42 L32 52 L16 42 V22 Z"
                fill="none"
                stroke="#A9C3AA"
                strokeWidth="1.4"
                opacity="0.55"
            />
            <text
                x="32"
                y="39"
                textAnchor="middle"
                fontFamily="'Source Serif 4', Georgia, serif"
                fontWeight="700"
                fontSize="24"
                fill="#F6F8F1"
            >
                M
            </text>
            <circle cx="47" cy="19" r="7" fill="#96742A" />
            <text
                x="47"
                y="23"
                textAnchor="middle"
                fontFamily="'IBM Plex Mono', ui-monospace, monospace"
                fontWeight="600"
                fontSize="9"
                fill="#17331D"
            >
                $
            </text>
        </svg>
    )
}