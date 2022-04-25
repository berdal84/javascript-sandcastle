

/**
 * Factory to create a node
 */
const create =
{
    leaf: (_value) =>
    {
        return create.node(_value, null, null);
    },
    node: (_value, _left, _right) =>
    {
        const new_node = {
            left:  _left,
            right: _right,
            value: _value
        };
        console.log(`Create a node with value ${_value}`);
        return new_node;
    }
}

/**
 * Create a simple graph
 */
const graph = create.node(
    "root",
    create.leaf("leaf1"),
    create.node(
        "node1",
        create.leaf("leaf2"),
        create.leaf("leaf3")
    )
);

/**
 * Define a node_logger
 */
const log =
{
    value_recursively: (_node) =>
    {
        log.value_recursively_ext(_node, "");
    },

    value_recursively_ext: (_node, _pref) =>
    {
        if ( _node == null) return "";
         
        const result = _pref + "o " + _node.value;
        console.log(result);

        _pref = _pref
            .replace("\`", "|")
            .replace("--", "  ");

        log.value_recursively_ext(_node.right, _pref +  "|--");
        log.value_recursively_ext(_node.left,  _pref + "\`--");
    }
}

/**
 * should print in console something like:
 *  

script.js:52 o root
script.js:52 |--o node1
script.js:52 |  |--o leaf3
script.js:52 |  `--o leaf2
script.js:52 `--o leaf1

 */

log.value_recursively(graph);
