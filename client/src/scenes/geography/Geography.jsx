import { Box, useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";

import { useGetGeographyQuery } from "../../state/api";
import Header from "../../components/Header";
import { geoData } from "../../state/geoData";

const Geography = () => {
  const theme = useTheme();
  const { data } = useGetGeographyQuery();
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='GEOGRAPHY' subtitle='Find where your users are located.' />
      <Box
        mt='20px'
        height='75vh'
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius='4px'
      >
        {data ? (
          <ResponsiveChoropleth
            data={data.formattedLocations}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            domain={[0, 60]}
            unknownColor='#666666'
            label='properties.name'
            valueFormat='.2s'
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            graticuleLineColor='#dddddd'
            borderWidth={0.5}
            borderColor='#152538'
            legends={[
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
