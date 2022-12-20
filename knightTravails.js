class Vertex {
    adj = [];
    constructor(value) {
        this.value = value;
    }
}

const offsets = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1]
];

function convert(c = [0, 0]) {
    return c[0] + c[1]*8;
}

function buildGraph() {
    for(let i=0; i<8; ++i)
        for(let j=0; j<8; ++j) {
            let vertex = new Vertex([j, i]);
            for(offset of offsets) {
                let ax = j + offset[0];
                let ay = i + offset[1];
                if(ax>=0 && ax<8 && ay>=0 && ay<8)
                    vertex.adj.push(convert([ax, ay]));
            }
            graph.push(vertex);
        }
}

function knightMoves(a = [0, 0], b = [7, 7]) {
    let visited = Array(64);
    let target = convert(b);
    let queue = [ [ convert(a) ] ];
    while(queue.length) {
        let path = queue.shift();
        let vertex = path[path.length-1];
        if(vertex === target)
            return path.map((v) => graph[v].value);
        for(adjacent of graph[vertex].adj) {
            if(!visited[adjacent]) {
                let newPath = [...path];
                newPath.push(adjacent);
                queue.push(newPath);
                visited[adjacent] = true;
            }
        }
    } 
}

const graph = [];
buildGraph();
console.log(knightMoves([0,0], [1,2]));
console.log(knightMoves([0,0],[3,3]));
console.log(knightMoves([3,3],[0,0]));
console.log(knightMoves([3,3],[4,3]));