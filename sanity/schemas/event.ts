import { defineType, defineField } from "sanity";

export const eventSchema = defineType({
  name: "agcEvent",
  title: "AGC Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      
      options: {
        list: [
          {
            title: "AZAGC Education / Training",
            value: "AZAGC Education / Training",
          },
          { title: "AZAGC Events", value: "AZAGC Events" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "startDate",
      title: "Start date & time",
      type: "datetime",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date & time",
      type: "datetime",
    }),
    defineField({
      name: "timezone",
      title: "Timezone",
      type: "string",
      description:
        "IANA timezone used when displaying this event (Sanity stores datetimes in UTC).",
      options: {
        list: [
          { title: "Arizona (no DST)", value: "America/Phoenix" },
          { title: "Mountain", value: "America/Denver" },
          { title: "Pacific", value: "America/Los_Angeles" },
          { title: "Central", value: "America/Chicago" },
          { title: "Eastern", value: "America/New_York" },
          { title: "UTC", value: "UTC" },
        ],
        layout: "dropdown",
      },
      initialValue: "America/Phoenix",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "title", startDate: "startDate", category: "category" },
    prepare({ title, startDate, category }) {
      const dateStr = startDate
        ? new Date(startDate as string).toISOString().slice(0, 16).replace("T", " ")
        : undefined;
      const sub = [category, dateStr].filter(Boolean).join(" · ");
      return {
        title: title ?? "Event",
        subtitle: sub || undefined,
      };
    },
  },
  orderings: [
    {
      title: "Start date (soonest first)",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
});
