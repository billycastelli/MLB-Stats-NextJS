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

const searchFetcher = async (
  route,
  query_string,
  result_size,
  starting_index
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_LAMBDA_API_ENDPOINT}/search`;
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        name_input: query_string,
        result_size: result_size,
        starting_index: starting_index,
      }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { pidFetcher, searchFetcher };
