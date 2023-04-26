import { assertEquals, rehypeParse, unified } from "../deps.ts";
import rehypeSplitWhitespace from "./main.ts";

const pipeline = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeSplitWhitespace);

Deno.test("one leading", async () => {
  const input = " foo";
  const expected = {
    "type": "root",
    "children": [
      {
        "type": "text",
        "value": " ",
      },
      {
        "type": "text",
        "value": "foo",
        "position": {
          "start": {
            "line": 1,
            "column": 1,
            "offset": 0,
          },
          "end": {
            "line": 1,
            "column": 5,
            "offset": 4,
          },
        },
      },
    ],
    "data": {
      "quirksMode": false,
    },
    "position": {
      "start": {
        "line": 1,
        "column": 1,
        "offset": 0,
      },
      "end": {
        "line": 1,
        "column": 5,
        "offset": 4,
      },
    },
  };

  const tree = await pipeline
    .parse(input);
  const actual = await pipeline
    .run(tree);

  assertEquals(actual, expected);
});

Deno.test("one trailing", async () => {
  const input = "foo ";
  const expected = {
    "type": "root",
    "children": [
      {
        "type": "text",
        "value": "foo",
        "position": {
          "start": {
            "line": 1,
            "column": 1,
            "offset": 0,
          },
          "end": {
            "line": 1,
            "column": 5,
            "offset": 4,
          },
        },
      },
      {
        "type": "text",
        "value": " ",
      },
    ],
    "data": {
      "quirksMode": false,
    },
    "position": {
      "start": {
        "line": 1,
        "column": 1,
        "offset": 0,
      },
      "end": {
        "line": 1,
        "column": 5,
        "offset": 4,
      },
    },
  };

  const tree = await pipeline
    .parse(input);
  const actual = await pipeline
    .run(tree);

  assertEquals(actual, expected);
});

Deno.test("one leading and trailing", async () => {
  const input = " foo ";
  const expected = {
    "type": "root",
    "children": [
      {
        "type": "text",
        "value": " ",
      },
      {
        "type": "text",
        "value": "foo",
        "position": {
          "start": {
            "line": 1,
            "column": 1,
            "offset": 0,
          },
          "end": {
            "line": 1,
            "column": 6,
            "offset": 5,
          },
        },
      },
      {
        "type": "text",
        "value": " ",
      },
    ],
    "data": {
      "quirksMode": false,
    },
    "position": {
      "start": {
        "line": 1,
        "column": 1,
        "offset": 0,
      },
      "end": {
        "line": 1,
        "column": 6,
        "offset": 5,
      },
    },
  };

  const tree = await pipeline
    .parse(input);
  const actual = await pipeline
    .run(tree);

  assertEquals(actual, expected);
});
