import { Injectable } from '@angular/core';
import IResult from '../interfaces/IResult';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    lastResult: IResult;
    resultTable: IResult[] = [];
    resultTable5: IResult[] = [];
    resultTable10: IResult[] = [];
    resultTable15: IResult[] = [];
    name: string;
    maxResultCount = 2;
    isSuccess: boolean;
    isNewRecord: boolean;

    constructor() {}

    updateResultTable(gameResult: IResult) {
        switch (gameResult.time) {
            case 5:
                this.checkResult(this.resultTable5, gameResult);
                break;

            case 10:
                this.checkResult(this.resultTable10, gameResult);
                break;

            case 15:
                this.checkResult(this.resultTable5, gameResult);
                break;

            default:
                break;
        }
    }

    checkResult(resultTable: IResult[], gameResult: IResult) {
        if (resultTable.length >= this.maxResultCount) {
            this.checkNewRecord(gameResult, resultTable);
            this.insertToTable(gameResult, resultTable);
        } else {
            if (resultTable.length === 0) {
                this.isNewRecord = true;
            } else {
                this.checkNewRecord(gameResult, resultTable);
            }
            resultTable.push({ ...gameResult });
            this.isSuccess = true;
        }
        this.resultTable = resultTable;
        this.lastResult = { ...gameResult };
    }

    insertToTable(result, table) {
        const minIndex = table.reduce((res, item, index, arr) => {
            if (item.result < arr[res].result) {
                return index;
            } else return res;
        }, 0);

        if (result.result > table[minIndex].result) {
            table.splice(minIndex, 1, { ...result });
            this.isSuccess = true;
        } else {
            this.isSuccess = false;
        }
    }

    checkNewRecord(result, table) {
        const maxIndex = table.reduce((res, item, index, arr) => {
            if (item.result > arr[res].result) {
                return index;
            } else return res;
        }, 0);

        if (result.result > table[maxIndex].result) {
            this.isNewRecord = true;
        } else {
            this.isNewRecord = false;
        }
    }

    saveName(name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getResultTable() {
        return this.resultTable;
    }

    getLastResult() {
        return this.lastResult;
    }

    getResults() {
        return {
            resultTable: this.resultTable,
            result: this.lastResult,
            isSuccess: this.isSuccess,
            isNewRecord: this.isNewRecord
        };
    }
}
