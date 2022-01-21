import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {fetcher} from "../util";
import useSWR from 'swr'


function Tabel({url, coloane, primaColoanaLink, urlBaza, calculeazaNota}) {
    // iau datele
    const { data, error } = useSWR(url, fetcher);

    // functia de calculat nota
    function nota(arr) {
        if (arr.length == 1) {
            return arr[0]
        }

        if (arr.length == 2) {
            return (arr[0] + arr[1])/2
        }

        const nArr = arr.map(x => x.note)

        const min = Math.min.apply(null, nArr);
        const max = Math.max.apply(null, nArr);

        // scap de minim si maxim
        const processedArr = nArr.filter((e) => e != min && e != max)

        // fac media aritmetica din ce a ramas
        const val = processedArr.reduce((a, b) => a + b, 0)/processedArr.length;

        console.log(val);

        if (val == NaN) {
            return 0;
        }

        return val;
    }

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <Table bordered>
            <thead>
                <tr>
                    {/* pentru fiecare coloana, o sa generez un th */}
                    {coloane.map(coloana => {
                        return (
                            <th>
                                {coloana}
                            </th>
                        );
                    })}
                    {/* daca propietatea calculeazaNota este specificata atunci va mai aparea o coloana cu nota */}
                    {calculeazaNota && <th>nota</th>}
                </tr>
            </thead>
            <tbody>
                {/* mapez datele */}
                {data.map(x => {
                    // x este un row in tabel
                    return (
                        <tr>
                            {/* pentru fiecare coloana afisata, o sa pun un td cu valoarea din rand */}
                            {coloane.map((y, i) => {
                                if (i === 0 && primaColoanaLink)
                                    return <td><Link to={`${urlBaza}/${x[y]}`}>{x[y]}</Link></td>
                                
                                return <td>{x[y]}</td>
                            })}
                            {/* daca vrem sa calculam nota */}
                            {calculeazaNota && <td>{nota(x.notes)}</td>}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}
export default Tabel;