import { visit } from "../deps.ts";
import type { Plugin, Root } from "../deps.ts";

const leadingSpaceRe = /^\s+(?!$)/;
const trailingSpaceRe = /(?<!^)\s+$/;

/**
 * Removes leading and trailing whitespace from non-empty text node
 * and adds it as separate text node before and after node in parent
 *
 * note: don't match empty text nodes of only whitespace
 * otherwise next match is new node itself, which becomes an
 * infinite loop of moving the whitespace into a new node
 * and leaving behind an empty text node
 */
// todo: also transfer position information?
// todo: handle edge case of undefined
const rehypeSplitWhitespace: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      // note: add trailing space first since adding leading space
      // first would change the index of the node
      const trailingSpace = node.value.match(trailingSpaceRe);

      if (trailingSpace) {
        parent.children.splice(index + 1, 0, {
          type: "text",
          value: trailingSpace[0],
        });
        node.value = node.value.replace(trailingSpaceRe, "");
      }

      const leadingSpace = node.value.match(leadingSpaceRe);

      if (leadingSpace) {
        parent.children.splice(index, 0, {
          type: "text",
          value: leadingSpace[0],
        });
        node.value = node.value.replace(leadingSpaceRe, "");
      }
    });
  };
};

export default rehypeSplitWhitespace;
