const LinkedList = () => {
    let head = null;
    let tail = null;
    let _size = 0;

    const append = (value) => {
        if(!head) {
            head = Node(value);
            tail = head;
            _size++;
            return;
        }
        tail.nextNode = Node(value);
        tail = tail.nextNode;
        _size++;
    }

    const prepend = (value) => {
        if(!head) {
            head = Node(value);
            tail = head;
            _size++;
            return;
        }
        const newNode = Node(value);
        newNode.nextNode = head;
        head = newNode;
        _size++;
    }

    const at = (index) => {
        let currentNode = head;
        for(let i=0; i<index; ++i) {
            if(!currentNode) break;
            currentNode = currentNode.nextNode;
        }
        return currentNode;
    }

    const pop = () => {
        if(!head) throw 'cannot pop empty list';
        if(head === tail) {
            head = null;
            tail = null;
            _size--;
            return;
        }
        let newTail = at(_size-2);
        newTail.nextNode = null;
        tail = newTail;
        _size--;
    }

    const popFront = () => {
        if(!head) throw 'cannot pop empty list';
        if(head === tail) {
            head = null;
            tail = null;
            _size--;
            return;
        }
        head = head.nextNode;
        head.nextNode = null;
    }

    const find = (value) => {
        let currentNode = head;
        for(let i=0; currentNode.nextNode; ++i) {
            if(currentNode.value === value) return i;
            currentNode = currentNode.nextNode;
        }
        return null;
    }

    const contains = (value) => {
        if(find(value)) return true;
        return false;
    }

    const insertAt = (value, index) => {
        if(index < 0 || index >= _size)
            throw 'index out of bounds';
        if(index === 0) {
            prepend(new Node(value));
            return;
        }
        const prevNode = at(index-1);
        const newNode = new Node(value);
        newNode.nextNode = prevNode.nextNode;
        prevNode.nextNode = newNode;
    }

    const removeAt = (index) => {
        if(index < 0 || index >= _size)
            throw 'index out of bounds';
        if(index === 0) {
            popFront();
            return;
        }
        if(index === _size-1) {
            pop();
            return;
        }
        const prevNode = at(index-1);
        const indexNode = indexNode.nextNode;
        prevNode.nextNode = indexNode.nextNode;
        indexNode.nextNode = null;
    }

    const toString = () => {
        let result = '';
        let currentNode = head;
        if(head !== null)
            while(currentNode.nextNode) {
                result += '( ' + currentNode.value + ' ) -> ';
                currentNode = currentNode.nextNode();
            }
        result += 'null';
        return result;
    }

    const size = () => {
        return _size;
    }

    return {
        append,
        prepend,
        pop,
        popFront,
        at,
        insertAt,
        removeAt,
        contains,
        find,
        size,
        toString,
        head,
        tail,
    };
}

const Node = (newValue = null) => {
    let value = newValue;
    let nextNode = null;
    return {
        value,
        nextNode,
    };
}