report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_Blog_Homepage_0_document_0_phone.png",
        "test": "..\\bitmaps_test\\20191125-113723\\backstop_default_Blog_Homepage_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_Blog_Homepage_0_document_0_phone.png",
        "label": "Blog Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 1,
        "url": "http://localhost:8000",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": -4656
          },
          "misMatchPercentage": "13.65",
          "analysisTime": 820
        },
        "diffImage": "..\\bitmaps_test\\20191125-113723\\failed_diff_backstop_default_Blog_Homepage_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_Blog_Homepage_0_document_1_tablet.png",
        "test": "..\\bitmaps_test\\20191125-113723\\backstop_default_Blog_Homepage_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_Blog_Homepage_0_document_1_tablet.png",
        "label": "Blog Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 1,
        "url": "http://localhost:8000",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": -737
          },
          "misMatchPercentage": "5.84",
          "analysisTime": 842
        },
        "diffImage": "..\\bitmaps_test\\20191125-113723\\failed_diff_backstop_default_Blog_Homepage_0_document_1_tablet.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_Blog_Homepage_0_document_2_desktop.png",
        "test": "..\\bitmaps_test\\20191125-113723\\backstop_default_Blog_Homepage_0_document_2_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_Blog_Homepage_0_document_2_desktop.png",
        "label": "Blog Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 1,
        "url": "http://localhost:8000",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": 41
          },
          "misMatchPercentage": "5.19",
          "analysisTime": 968
        },
        "diffImage": "..\\bitmaps_test\\20191125-113723\\failed_diff_backstop_default_Blog_Homepage_0_document_2_desktop.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_Blog_Post_0_document_0_phone.png",
        "test": "..\\bitmaps_test\\20191125-113723\\backstop_default_Blog_Post_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_Blog_Post_0_document_0_phone.png",
        "label": "Blog Post",
        "requireSameDimensions": true,
        "misMatchThreshold": 1,
        "url": "http://localhost:8000/template",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.02",
          "analysisTime": 372
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_Blog_Post_0_document_1_tablet.png",
        "test": "..\\bitmaps_test\\20191125-113723\\backstop_default_Blog_Post_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_Blog_Post_0_document_1_tablet.png",
        "label": "Blog Post",
        "requireSameDimensions": true,
        "misMatchThreshold": 1,
        "url": "http://localhost:8000/template",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.02",
          "analysisTime": 558
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_Blog_Post_0_document_2_desktop.png",
        "test": "..\\bitmaps_test\\20191125-113723\\backstop_default_Blog_Post_0_document_2_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_Blog_Post_0_document_2_desktop.png",
        "label": "Blog Post",
        "requireSameDimensions": true,
        "misMatchThreshold": 1,
        "url": "http://localhost:8000/template",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.02",
          "analysisTime": 600
        }
      },
      "status": "pass"
    }
  ],
  "id": "backstop_default"
});