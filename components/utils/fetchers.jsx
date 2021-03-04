const pidFetcher = async (path) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_LAMBDA_API_ENDPOINT}/${path}`;
    const response = await fetch(url, {
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = { pidFetcher };
