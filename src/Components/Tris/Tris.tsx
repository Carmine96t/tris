import { useState } from "react";
import './Tris.css'

export interface Giocatore{
    simbolo: Simboli
    mioTurno: boolean
    vittoria: boolean
}

enum Simboli {X = 'X', O = 'O'}

type Matrix = string[][];

const defaultMatrix = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]


export default function Tris(){
    const [giocatore1, setGiocatore1] = useState<Giocatore>({simbolo: Simboli.X, mioTurno: true, vittoria: false})
    const [giocatore2, setGiocatore2] = useState<Giocatore>({simbolo: Simboli.O, mioTurno: false, vittoria: false})
    const [matrix, setMatrix] = useState<Matrix>(defaultMatrix)

    function resetta(){
        setMatrix(defaultMatrix)
        setGiocatore1({...giocatore1, mioTurno: true, vittoria: false})
        setGiocatore2({...giocatore2, mioTurno: false, vittoria: false})
    }

    function hendleClik(rowIndex: number, colIndex: number){
        if(giocatore1.mioTurno){
            setGiocatore1({...giocatore1, mioTurno: false})
            setGiocatore2({...giocatore2, mioTurno: true})
            updateCell(rowIndex, colIndex, giocatore1.simbolo)
        }else if(giocatore2.mioTurno) {
            setGiocatore1({...giocatore1, mioTurno: true})
            setGiocatore2({...giocatore2, mioTurno: false})
            updateCell(rowIndex, colIndex, giocatore2.simbolo)
        }
    }

    const updateCell = (rowIndex: number, colIndex: number, newValue: string) => {
        const updatedMatrix = matrix.map((row, rIdx) =>
          row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? newValue : cell))
        );
        setMatrix(updatedMatrix);// Aggiorna la matrice con il nuovo valore

        const esitoPartita = checkWinner(updatedMatrix)
        console.log(esitoPartita)

        if( esitoPartita === giocatore1.simbolo ) {
            setGiocatore1({...giocatore1, mioTurno: false, vittoria: true})
            setGiocatore2({...giocatore2, mioTurno: false})
        }else if( esitoPartita === giocatore2.simbolo ){
            setGiocatore2({...giocatore2, mioTurno: false, vittoria: true})
            setGiocatore1({...giocatore1, mioTurno: false})
        }else if(esitoPartita === 'Tie') {
            setGiocatore1({...giocatore1, mioTurno: false, vittoria: true})
            setGiocatore2({...giocatore2, mioTurno: false, vittoria: true})
        }
      };

      const checkWinner = (matrix: Matrix): string => {
        
        const lines = [
          // Righe
          [matrix[0][0], matrix[0][1], matrix[0][2]],
          [matrix[1][0], matrix[1][1], matrix[1][2]],
          [matrix[2][0], matrix[2][1], matrix[2][2]],
          // Colonne
          [matrix[0][0], matrix[1][0], matrix[2][0]],
          [matrix[0][1], matrix[1][1], matrix[2][1]],
          [matrix[0][2], matrix[1][2], matrix[2][2]],
          // Diagonali
          [matrix[0][0], matrix[1][1], matrix[2][2]],
          [matrix[0][2], matrix[1][1], matrix[2][0]],
        ];
    
        // Controlla se c'è una linea con tutti e tre i simboli uguali (X o O)
        for (let line of lines) {
          if (line[0] && line[0] === line[1] && line[0] === line[2]) {
            console.log(line[0])
            return line[0]; // Restituisce "X" o "O" come vincitore
          }
        }
    
        // Se tutte le celle sono piene e non c'è un vincitore, è un pareggio
        if (matrix.flat().every(cell => cell !== '')) {
          return "Tie";
        }
    
        // Nessun vincitore, la partita continua
        return '';
    };

    return(
        <>
            <div className="container">
            <h2 className="title">Tris</h2>
                {
                    giocatore1.mioTurno ? <p className="title" >Turno Del Giocatore 1</p> : ''
                }
                {
                    giocatore2.mioTurno ? <p className="title" >Turno Del Giocatore 2</p> : ''
                }
                {
                    giocatore1.vittoria ? <p className="result">Vittoria Del Giocatore 1</p> : ''
                }
                {
                    giocatore2.vittoria ? <p className="result">Vittoria Del Giocatore 2</p> : ''
                }
                {
                    giocatore2.vittoria && giocatore1.vittoria ? <p className="result" >Pareggio</p> : ''
                }
                <table className="table">
                    <tbody>
                    {matrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={colIndex} className="cell">
                                <button onClick={() => hendleClik(rowIndex, colIndex)} className="button">
                                    {cell}
                                </button>
                            </td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button className="resetButton" onClick={() => resetta()}>Nuova Partita</button>
            </div>
        </>
    )
}