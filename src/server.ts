export default {
  async fetch(request: Request) {
    return Response.redirect(
      "https://tanstack-start-ts.zoqmenu.workers.dev/",
      302,
    );
  },
};
