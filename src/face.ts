import { Color, Move } from "./consts";
import { permute } from "./utils";

export class Face {
    public colors: Array<Color>

    public static from(colors: Array<Color>): Face {
        const face = new Face();
        face.colors = colors.slice();
        return face;
    }

    public isSolid(): boolean {
        return this.colors.every(c => c === this.colors[0]);
    }

    public center(): Color {
        return this.colors[4];
    }

    public useRotator(r: Move, inv: boolean) {
        var coef = 2 - (r % 3);
        if (!inv) coef = 2 - coef;

        if (coef === 0) this.r90();
        else if (coef === 1) this.r180();
        else this.r270();
    }

    public r90() {
        permute(this.colors, [0, 1, 2, 3, 4, 5, 6, 7, 8], [6, 3, 0, 7, 4, 1, 8, 5, 2]);
    }

    public r180() {
        permute(this.colors, [0, 1, 2, 3, 4, 5, 6, 7, 8], [8, 7, 6, 5, 4, 3, 2, 1, 0]);
    }

    public r270() {
        permute(this.colors, [0, 1, 2, 3, 4, 5, 6, 7, 8], [2, 5, 8, 1, 4, 7, 0, 3, 6]);
    }
}
