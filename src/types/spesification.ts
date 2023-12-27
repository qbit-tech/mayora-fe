export type SpesificationProps = {
    [key:string] : {
        label: string,
        value: any,
    }
}

export const predefineSpec: SpesificationProps = {
    volume: {
        label: 'volume',
        value: 0
    },
    color: {
        label: 'color',
        value: '#FFFFFF'
    },
    warranty: {
        label: 'warranty',
        value: '30 days'
    },
}