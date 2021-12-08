setTimeout(
  (name) => {
    let ramenList = name;
    console.log(ramenList);
    setTimeout(
      (name) => {
        ramenList += ", " + name;
        console.log(ramenList);
        setTimeout(
          (name) => {
            ramenList += ", " + name;
            console.log(ramenList);
            setTimeout(
              (name) => {
                ramenList += ", " + name;
                console.log(ramenList);
                setTimeout(
                  (name) => {
                    ramenList += ", " + name;
                    console.log(ramenList);
                    setTimeout(
                      (name) => {
                        ramenList += ", " + name;
                        console.log(ramenList);
                      },
                      500,
                      "공화춘"
                    );
                  },
                  500,
                  "열라면"
                );
              },
              500,
              "짜파게티"
            );
          },
          500,
          "진라면"
        );
      },
      500,
      "신라면"
    );
  },
  500,
  "꼬꼬면"
);
