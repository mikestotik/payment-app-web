import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cardType'
})
export class CardTypePipe implements PipeTransform {

    transform(value: number): unknown {
        const i = String(value).charAt(0);
        const type = cardTypes.find(t => String(t.num) === i);

        if (type) {
            return type.name;
        }
        return 'Unknown';
    }

}

interface CardType {
    num: number;
    name: string;
}

const cardTypes: Array<CardType> = [
    {
        num: 3,
        name: 'Travel/Entertainment'
    },
    {
        num: 4,
        name: 'Visa'
    },
    {
        num: 5,
        name: 'MasterCard'
    },
    {
        num: 6,
        name: 'Discover Card'
    }
];
