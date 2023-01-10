import {
  useIsMutating,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getCategories,
  getDetailCandidate,
  getLocations,
  getPropertyValues,
  postPropertyValues,
  putDetailCandidate,
} from "ultis/api";

const initialData = {
  count: 0,
  data: [],
};

const getCategoriesCurrying = (type, parent_id) => {
  return getCategories({
    params: {
      type,
      parent_id: parent_id ?? null,
    },
  });
};

export const useQueryIndustry = () => {
  const queryClient = useQueryClient();

  const {
    data: { data: industries },
  } = useQuery(["industries"], () => getCategoriesCurrying(1), {
    initialData,
  });

  const {
    data: { data: sectors },
  } = useQuery(["sectors"], {
    initialData,
    enabled: false,
  });

  const {
    data: { data: categories },
  } = useQuery(["categories"], {
    initialData,
    enabled: false,
  });

  const fetchSectors = ({ parent_id }) => {
    queryClient.fetchQuery(["sectors"], () =>
      getCategoriesCurrying(2, parent_id)
    );
  };

  const fetchCategories = ({ parent_id }) => {
    queryClient.fetchQuery(["categories"], () =>
      getCategoriesCurrying(3, parent_id)
    );
  };

  return { industries, sectors, categories, fetchSectors, fetchCategories };
};

export const useQueryLocation = () => {
  const queryClient = useQueryClient();

  const { data: countries } = useQuery(
    ["countries"],
    () =>
      getLocations({
        params: {
          type: 4,
        },
      }),
    {
      initialData,
      select: (data) => data.data,
    }
  );

  const {
    data: { data: cities },
  } = useQuery(["cities"], {
    enabled: false,
    initialData,
  });

  const {
    data: { data: districts },
  } = useQuery(["districts"], {
    enabled: false,
    initialData,
  });

  const fetchCities = (parent_id) => {
    queryClient.fetchQuery(["cities"], () =>
      getLocations({
        params: {
          parent_id,
        },
      })
    );
  };

  const fetchDistricts = (parent_id) => {
    queryClient.fetchQuery(["districts"], () =>
      getLocations({
        params: {
          type: 2,
          parent_id,
        },
      })
    );
  };

  return { countries, cities, districts, fetchCities, fetchDistricts };
};

export const useQueryDetailCandidateID = (id) => {
  const queryClient = useQueryClient();
  const info = useQuery(["candidate", id], () => getDetailCandidate(id), {
    initialData: {},
  });

  const mutation = useMutation({
    mutationKey: `candidate/${id}`,
    mutationFn: (params) => putDetailCandidate(id, params),
    onSuccess: (data) => {
      queryClient.setQueryData(["candidate", id], data);
    },
  });

  const isMutating = useIsMutating(`candidate/${id}`);
  mutation.isLoading = isMutating > 0;

  return [info, mutation];
};

export const useQueryNationalities = () => {
  const queryClient = useQueryClient();

  const query = useQuery(
    ["nationalities"],
    () =>
      getPropertyValues({
        params: {
          property_name: "nationality",
        },
      }),
    {
      initialData,
      select: (data) => data.data,
    }
  );

  const postNationality = (value) => {
    postPropertyValues({
      value,
      name: "nationality",
    });
  };

  const fetchNationalities = (value) => {
    queryClient.cancelQueries("nationalities");
    queryClient.fetchQuery("nationalities", () =>
      getPropertyValues({
        params: {
          value,
          property_name: "nationality",
        },
      })
    );
  };

  return { query, fetchNationalities, postNationality };
};

export const useQueryLanguages = () => {
  const query = useQuery(
    ["languages"],
    () =>
      getPropertyValues({
        params: {
          property_name: "language",
        },
      }),
    {
      // placeholderData: initialData,
      select: (data) => data.data,
      notifyOnChangeProps: ["data"],
    }
  );

  return query;
};

export const useQuerySoftSkills = () => {
  const query = useQuery(
    ["softSkill"],
    () =>
      getPropertyValues({
        params: {
          property_name: "soft_skills",
        },
      }),
    {
      initialData,
      select: (data) => data.data,
    }
  );
  return query;
};
