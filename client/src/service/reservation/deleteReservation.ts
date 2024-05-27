import sFetch from '../sFetch';

async function deleteReservation(id: number) {
  await sFetch({
    logTitle: `删除某个预约 id:${id}`,
    method: 'POST',
    url: `api/reservation/delete?reservationId=${id}`,
  });
}

export { deleteReservation };
