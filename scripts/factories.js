import { describe, expect, it } from "./testing.js";


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
            .replace("\`", " ")
            .replace("|", " ")
            .replace("--", "  ");

        log.value_recursively_ext(_node.left, _pref +  "|--");
    
        log.value_recursively_ext(_node.right,  _pref + "\`--");
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


log.value_recursively(graph); /* should print in console something like:
o root
|--o leaf1
`--o node1
   |--o leaf2
   `--o leaf3
 */


describe( "Factories", () => {

    it( "Should get leaf1", () => {
        const leaf1 = graph.left;
        expect( leaf1.value ).toBe("leaf1");
        expect( leaf1.left ).toBe(null);
        expect( leaf1.right ).toBe(null);
    })

    it( "Should get node1", () => {
        const node1 = graph.right;
        expect( node1.value ).toBe("node1");
        expect( node1.left ).notToBe(null);
        expect( node1.right ).notToBe(null);
    })

    it( "Should get depth 2 leaves (leaf2, leaf3)", () => {
        const leaf2 = graph.right.left;
        expect( leaf2.value ).toBe("leaf2");
        expect( leaf2.left ).toBe(null);
        expect( leaf2.right ).toBe(null);

        const leaf3 = graph.right.right;
        expect( leaf3.value ).toBe("leaf3");
        expect( leaf2.left ).toBe(null);
        expect( leaf2.right ).toBe(null);
    })
});
